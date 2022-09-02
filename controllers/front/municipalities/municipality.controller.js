
const db = require('../../../config/db');
const log = require('../../../lib/catch-error');

const municipality = {};


municipality.getList = async (req, res) => {

    try {
        
        await db.query('SELECT state_id, state_name, state_active FROM ir_state ORDER BY state_active ASC', (err, results) =>{
            if(err){
                log('src/controllers/front', 'municipality', 'getList', err.stack, false, req, res);
            }else{
                let states = results.rows;
                return res.render('municipalities/mun_home', { states });
            }
        });

    } catch (error) {
        log('src/controllers/front', 'municipality', 'getList', error, false, req, res);
    }

};

municipality.muncipalititesByState = async (req, res) => {
    const { state_id } = req.params;
    try {

         //get selected department
         let selectedState = await db.query('SELECT state_id, state_name FROM ir_state WHERE state_id = $1', [state_id]);
         selectedState = selectedState.rows[0];
        
        await db.query(`SELECT m.municipality_id, m.municipality_name, s.state_name as namestate, m.municipality_active
        FROM ir_municipalities as m 
        INNER JOIN ir_state as s ON m.state_id = s.state_id
        WHERE s.state_id = $1`, [state_id], (err, results) => {
            if (err) {
                log('src/controllers/front', 'municipality', 'muncipalititesByState', error, false, req, res);
                req.flash('delete', err.message);
            } else {
                
                let municipalities = results.rows;
                return res.render('municipalities/mun_list', {selectedState, municipalities, state_id})
            }
        });
    } catch (error) {
        log('src/controllers/front', 'municipality', 'muncipalititesByState', error, false, req, res);
    }
};

municipality.viewcreate = async(req, res)=>{
    const { state_id } = req.params;
    try {
        
        //get selected department
        let selectedState = await db.query('SELECT state_id, state_name FROM ir_state WHERE state_id = $1', [state_id]);
        selectedState = selectedState.rows[0];

        await db.query('SELECT state_id, state_name FROM ir_state WHERE active = 1', (err, results) =>{
            if(err){
                log('src/controllers/front', 'municipality', 'viewcreate', error, false, req, res);
            }else{
                let states = results.rows;
                res.render('municipalities/mun_create', { selectedState, states });
            }
        });
        
    } catch (error) {
        log('src/controllers/front', 'municipality', 'viewcreate', error, false, req, res);
    }

};

municipality.create = async (req, res) => {
    const {name, state_id} = req.body;

    try {

        await db.query('INSERT INTO ir_municipalities (municipality_name, state_id) VALUES ($1,$2)', [name, state_id], (err, results) => {
            if (err) {
                log('src/controllers/front', 'municipality', 'create', err.stack, false, req, res);
                req.flash('delete', err.message);
                return res.redirect('/municipalities/list');
            } else {
                req.flash('success', 'Registro guardado correctamente');
                return res.redirect(`/states/${state_id}/municipalities-list`);
            }
        });

    } catch (error) {
        log('src/controllers/front', 'municipality', 'create', error, false, req, res);
        req.flash('delete', error);
    }
};

municipality.getById = async (req, res) => {
    
    const { municipality_id } = req.params;

    try {
            
        let states = await db.query('SELECT state_id, state_name FROM ir_state');
        states = states.rows;

        await db.query(
        `SELECT m.municipality_id, m.municipality_name, m.municipality_active,
        s.state_id, s.state_name
        FROM ir_municipalities AS m 
        INNER JOIN ir_state AS s ON s.state_id = m.state_id
        WHERE m.municipality_id = $1`, 
        [municipality_id], (err, results) => {
            if (err) {
                req.flash('error',err.message);
                log('src/controllers/front', 'municipality', 'getById', err, false, req, res);
            }else{
                var municipality = results.rows[0];
                return res.render('municipalities/mun_update',{ municipality, states});
            }
        });

    } catch (error) {
        log('src/controllers/front', 'municipality', 'getById', error, false, req, res);
    }
};

municipality.update = async (req, res) => {

    const { municipality_id } = req.params;
    const { name, state_id, active } = req.body;

    try {
        
        await db.query('UPDATE ir_municipalities SET municipality_name = $1, state_id = $2, municipality_active = $3 WHERE municipality_id = $4', [name, state_id, active ,municipality_id], (err, results) => {
            if (err) {
                log('src/controllers/front', 'municipality', 'update', err.message, false, req, res);
                return res.redirect(`/states/${municipality_id}/municipalities-list`);
            }else{
                req.flash('warning', 'registro Actualizado correctamente')
                return res.redirect(`/states/${state_id}/municipalities-list`);
            }    
        });   

    } catch (error) {
        log('src/controllers/front', 'municipality', 'update', error, false, req, res);
    }
};

municipality.deletesmunicipality = async (req, res) => {
    
    const { id } = req.params;
    
    await db.query('DELETE FROM ir_municipalities WHERE municipality_id = $1', [id], (err, results) => {
        if (err) {
            console.log(err.stack);
            return req.flash('error',err.message);
        }
        return res.redirect('/HomeMunicipality');
    });
};


module.exports = municipality;