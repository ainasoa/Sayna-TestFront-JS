const Employee = require('../models/employee')

const formValidator = (request) => {
    request.checkBody('firstName', 'Veuillez entrer le Nom !').notEmpty()
    request.checkBody('lastName', 'Veuillez entrer le Prénom !').notEmpty()
    request.checkBody('email', 'Veuillez entrer l\'adresse E-mail !').notEmpty()
    request.checkBody('tel', 'Veuillez entrer le Contact !').notEmpty()
    request.checkBody('responsibility', 'Veuillez entrer la Résponsabilité !').notEmpty()

    return request.validationErrors()
}

module.exports.getAllEmployees = async function (req, res) {
    res.render("employee/index", {
        title: "LISTE DES EMPLOYEES",
        employees: await Employee.find({})
    })
}

module.exports.loadEmployeeForm = function (req, res) {
    if (!!req.params?.id) {
        Employee.findById(req.params.id, function (err, employee) {
            res.render('employee/employee_form', {
                title: 'MODIFIER LE RENSEIGNEMENT',
                employee
            })
        })
    } else {
        res.render('employee/employee_form', {
            title: 'AJOUTER UN EMPLOYEE',
        })
    }
}

module.exports.newEmployee = function (req, res) {
    const errors = formValidator(req)

    if (!!errors) {
        res.render('employee/employee_form', {
            title: 'AJOUTER UN EMPLOYEE',
            errors
        })
    } else {
        Employee.create(req.body)
            .then(() => {
                res.redirect('/employee')
            }).catch((err) => {
                console.error(err.errmsg)
            })
    }
}

module.exports.updateEmployee = function (req, res) {
    let query = { _id: req.params.id }

    const errors = formValidator(req)

    if (!!errors) {
        Employee.findById(req.params.id, function (err, employee) {
            res.render('employee/employee_form', {
                title: 'MODIFIER LE RENSEIGNEMENT',
                employee,
                errors
            })
        })
    } else {
        Employee.update(query, req.body, function (err) {
            if (err) {
                console.error(err.errmsg)
                res.send("Error")
            } else {
                res.redirect('/employee')
            }
        })
    }
}

module.exports.removeEmployee = function (req, res) {
    let query = { _id: req.params.id }

    Employee.remove(query, function (err) {
        if (err) {
            console.error(err)
            return
        } else {
            res.redirect("/employee")
        }
    })
}

module.exports.showEmployee = function (req, res) {
    Employee.findById(req.params.id, function (err, employee) {
        res.render('employee/employee_detail', {
            title: "RENSEIGNEMENT",
            employee
        })
    })
}