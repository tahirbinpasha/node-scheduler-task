
const { user } = require("../../../config/db");
const { models } = require("../../../sequelize/sequelize");
const sequelize = require("../../../sequelize/sequelize");
const Op = sequelize.sequelize.Op;

const addCronJob = async function (req, res, next) {
    try
    {  
        let [job, error]  = await createJob(req, new models.jobs({}), next)
        if (error)
        {
            console.log(error)
            return next({
                status: "error",
                statusCode: 422,
                message: "SOMETHING_WENT_WRONG"
            });
        }
        else
        {
            return next({
                status: "success",
                statusCode: 200,
                data: job,
                message: "DATA_CREATED"
            });            

           
        }
        
    }
    catch(error)
    {
        return next(error)
    } 
}

const getSentEmails = async function (req, res, next) {
    try
    {  
        let instance = new sequelize.db(sequelize.models.sent_emails);
        let [emails, error] = await instance.findAll();

        if (error)
        {
            console.log(error)
            return next({
                status: "error",
                statusCode: 422,
                message: "SOMETHING_WENT_WRONG"
            });
        }
        else
        {
            return next({
                status: "success",
                statusCode: 200,
                data: emails,
                message: "DATA_FETCHED"
            });           
        }
        
    }
    catch(error)
    {
        return next(error)
    } 
}



const runCronJob = async function () {
    
    console.log('Running Cron Job');

    const currentTime = new Date();
    const dayOfWeek = currentTime.toLocaleString('en-US', { weekday: 'long' });
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:00`;
    const dateString = currentTime.toISOString().split('T')[0];


    let instance = new sequelize.db(sequelize.models.jobs);
    let [jobs, error] = await instance.findAll({where: {job_done: 0, time: timeString, [Op.or]:[{date: dateString},{day_of_week:dayOfWeek}]}});

    jobs.forEach(async job => {
        let a = await sendJobToUsers(job);
    });

}


module.exports = {

    addCronJob,
    runCronJob,
    getSentEmails

};


const createJob = async (req, job, next) => {
    
    let {description, user_ids, type, day_of_week, date, time} = req.body
    
    let instance = new sequelize.db(sequelize.models.jobs);
   
    job.description = description;
    job.user_ids = user_ids;
    job.type = type;
    job.day_of_week = day_of_week;
    job.date = date;
    job.time = time;
    
    return  await instance.create(job.toJSON())
    
}


const updateJobDone = async (job) => {
    
    let instance = new sequelize.db(sequelize.models.jobs);
    let [jobFetched, error] = await instance.findOne({where: {id: job.id, type: "one-time"}})

    if (jobFetched)
    {
        instance.model = jobFetched
        return await instance.update({job_done: 1});
    }
   
}



const sendJobToUsers = async (job) => {

    let user_ids = job.user_ids.split(',')

    console.log("user_ids == ", user_ids)

    user_ids.forEach(async user_id => {

        let instance = new sequelize.db(sequelize.models.users);
        let [userFetched, error] = await instance.findOne({where: {id: user_id}})

        if (userFetched)
            {
 
                let  subject = ""
                let  body = ""

                if (job.type == "one-time")
                {
                    subject = "One time job email on " + job.date + " at " + job.time
                    body = "This one time email is sent to " + userFetched.name + " on " + job.date + " at " + job.time
                }
                else
                {
                    subject = "Recursive job email on " + job.day_of_week + " at " + job.time
                    body = "This recursive email is sent to " + userFetched.name + " on " + job.day_of_week + " at " + job.time
                }
                
                let [email, er] = await sendEmail(userFetched, job, new models.sent_emails({}), subject, body)

                if (job.type == "one-time")
                {
                    let [jobUpdated, err] = await updateJobDone(job);
                }

            }


    });

    return
}


const sendEmail = async (user, job, sent_email, subject, body) => {
    
    let instance = new sequelize.db(sequelize.models.sent_emails);
   
    sent_email.user_id = user.id;
    sent_email.user_email = user.email;
    sent_email.job_id = job.id;
    sent_email.subject = subject;
    sent_email.body = body;
    
    return  await instance.create(sent_email.toJSON())
    
}