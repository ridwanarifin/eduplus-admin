import {
  mdiHomeOutline,
  mdiAccountMultipleOutline,
  mdiAccountPlusOutline,
  mdiSchoolOutline,
  mdiImageOutline,
  mdiInboxOutline
} from '@mdi/js'

export default [{
  icon: mdiHomeOutline,
  title: 'Administrator',
  to: '/'
}, {
  icon: mdiAccountMultipleOutline,
  title: 'Daftar Operator',
  to: '/operator'
}, {
  icon: mdiAccountPlusOutline,
  title: 'Request',
  to: '/request'
}, {
  icon: mdiSchoolOutline,
  title: 'Daftar Sekolah',
  to: '/school'
}, {
  icon: mdiImageOutline,
  title: 'Banner',
  to: '/banner'
}, {
  icon: mdiInboxOutline,
  title: 'Inbox',
  to: '/inbox'
}]
