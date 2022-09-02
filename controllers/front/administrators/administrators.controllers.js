const db = require('../../../config/db');
const log = require('../../../lib/catch-error');
const bcrypt = require('bcrypt');

const admin = {};

admin.adminList = async(req, res) =>{
    try {
        
        await db.query('SELECT * FROM ir_administrator WHERE admin_id != $1', [req.user.admin_id], (err, results) =>{
            if(err){
                log('src/controllers/front', 'administrators', 'adminList', err.message, false, req, res);
            }else{
                let administrators = results.rows;
                return res.render('administrators/admin_home', { administrators });
            }
        });
    } catch (error) {
        log('src/controllers/front', 'administrators', 'adminList', error, false, req, res);
    }
};

admin.createAdminView = async(req, res) =>{
    try {
        return res.render('administrators/admin_create');
    } catch (error) {
        log('src/controllers/front', 'administrators', 'createAdmin', error, false, req, res);
    }
};

admin.createAdmin = async(req, res) =>{
    const { username, name, lastname, email, password } = req.body;
    try {

                
        let passwordNew;

        if(password === "" || password == null){
            passwordNew = '$2a$10$6oWLTQ.0R/FYRp/EVFwaW.YEaPuC4/NZZGmzRpwrnjJTqQEIB0ZU2';
        }else{
            let salt = bcrypt.genSaltSync(10);
            passwordNew = bcrypt.hashSync(password, salt);
        }
        
        await db.query(
            `INSERT INTO ir_administrator (admin_username, admin_name, admin_lastname, admin_email, admin_password) 
            VALUES ($1, $2, $3, $4, $5)`, [username, name, lastname, email, passwordNew], (err, results) =>{
                if(err){
                    log('src/controllers/front', 'administrators', 'create', err.message, false, req, res);
                }else{
                    req.flash('success', 'Resgistro Guardado Correctamente');
                    return res.redirect('/administrators/list');
                }
            });
    } catch (error) {
        log('src/controllers/front', 'administrators', 'create', error, false, req, res);
    }
};

admin.updateAdminView = async(req, res) =>{
    const { admin_id } = req.params;
    try {
        await db.query(`SELECT * FROM ir_administrator WHERE admin_id = $1`, [admin_id], (err, results) =>{
            if(err){
                log('src/controllers/front', 'administrators', 'updateAdminView', err, false, req, res);
            }else{
                let administrator = results.rows[0];
                return res.render('administrators/admin_update', { administrator });
            }
        })
    } catch (error) {
        log('src/controllers/front', 'administrators', 'updateAdminView', error, false, req, res);
    }
};

admin.updateAdmin = async(req, res) =>{
    const { admin_id } = req.params;
    const {username, password, name, lastname, email, active} = req.body;

    try {
        
        let passwordNew;

        if(password === "" || password == null){
            passwordNew = '$2a$10$x5yKbfoRHQOMiMDc34Mw0eMlMHq3cmmAD4HyePXWVuI/yZZxy20re';
        }else{
            let salt = bcrypt.genSaltSync(10);
            passwordNew = bcrypt.hashSync(password, salt);
        }

        await db.query(`
        UPDATE ir_administrator 
        SET admin_username =$1, admin_password =$2, admin_name =$3, admin_lastname =$4, admin_email=$5, admin_active =$6
        WHERE admin_id = $7`,
        [username, passwordNew, name, lastname, email, active, admin_id], (err, results) =>{
            if(err){
                log('src/controllers/front', 'administrators', 'updateAdmin', err.message, false, req, res);
            }else{
                req.flash('warning', 'Registro Actualizado Correctamente');
                return res.redirect('/administrators/list');
            }
        });
    } catch (error) {
        log('src/controllers/front', 'administrators', 'updateAdmin', error, false, req, res);
    }
};

module.exports = admin;