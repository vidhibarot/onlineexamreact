import React from 'react'
// import ExamType from './views/pages/exam_types/exam_type'
// import ExamTypeForm from './views/pages/exam_types/exam_typeForm'
import User from './views/pages/users/user'
import UserForm from './views/pages/users/userForm'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))
const Role = React.lazy(() => import('./views/pages/role/role'))
const RoleForm = React.lazy(() => import('./views/pages/role/roleForm'))


// Subject
const Subject = React.lazy(() => import('./views/pages/subjects/subject'))
const SubjectForm = React.lazy(() => import('./views/pages/subjects/subjectForm'))

// Exam Type
const ExamType = React.lazy(() => import('./views/pages/exam_types/exam_type'))
const ExamTypeForm = React.lazy(() => import('./views/pages/exam_types/exam_typeForm'))

// Standard
const Standard = React.lazy(() => import('./views/pages/standards/standard'))
const StandardForm = React.lazy(() => import('./views/pages/standards/standardForm'))

// Exam
const Exam = React.lazy(() => import('./views/pages/exams/exam'))
const ExamForm = React.lazy(() => import('./views/pages/exams/examForm'))

// Question
const Question = React.lazy(() => import('./views/pages/questions/question'))
const QuestionForm = React.lazy(() => import('./views/pages/questions/questionForm'))

const ExamEnroll = React.lazy(() => import('./views/pages/userexamenroll/examenroll'))

const UserResult = React.lazy(() => import('./views/pages/userresult/user_result'))

const ExamPaper = React.lazy(() => import('./views/pages/examPaper/examPaper'));
const NewExamPaper = React.lazy(() => import('./views/pages/new_exampaper/new_exampaper'));

const StudentResult = React.lazy(() => import('./views/pages/student_results/student_results'))
const UserProfile = React.lazy(() => import('./views/pages/userprofile/user_profile'))
// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/pages/role', name: 'Role', element: Role },
  { path: '/roleForm', name: 'Roles', element: RoleForm },
  { path: '/pages/users', name: 'Userdata', element: User },
  { path: '/userForm', name: 'Userdata', element: UserForm },
  { path: '/pages/subjects', name: 'Subject', element: Subject },
  { path: '/subjectForm', name: 'Subjects', element: SubjectForm },
  { path: '/pages/exam_types', name: 'Examtype', element: ExamType },
  { path: '/exam_typeForm', name: 'Examtype', element: ExamTypeForm },
  { path: '/pages/standards', name: 'Standard', element: Standard },
  { path: '/pages/userprofile', name: 'Userprofile', element: UserProfile },
  { path: '/standardForm', name: 'Standards', element: StandardForm },
  { path: '/pages/exams', name: 'Exam', element: Exam },
  { path: '/examForm', name: 'Exams', element: ExamForm },
  { path: '/pages/questions', name: 'Question', element: Question },
  { path: '/pages/userexamenroll', name: 'ExamEnroll', element: ExamEnroll },
  { path: '/pages/new_exampaper', name: 'NewExamPaper', element: NewExamPaper },
  { path: '/pages/exam', name: 'ExamPaper', element: ExamPaper },
  { path: '/questionForm', name: 'Questions', element: QuestionForm },
  { path: '/pages/userresult', name: 'UserResult', element: UserResult },
  { path: '/pages/student_results', name: 'StudentResult', element: StudentResult },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },

]

export default routes

