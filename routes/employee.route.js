const { Router } = require('express')
const {
  getAllEmployees,
  newEmployee,
  loadEmployeeForm,
  updateEmployee,
  removeEmployee,
  showEmployee
} = require('../controllers/employee.controller')

const router = Router()

router.get('/', getAllEmployees)

router.get('/new', loadEmployeeForm)

router.post('/new', newEmployee)

router.get('/edit/:id', loadEmployeeForm)

router.post('/edit/:id', updateEmployee)

router.post('/delete/:id', removeEmployee)

router.get('/show/:id', showEmployee)

module.exports = router