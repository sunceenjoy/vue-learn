import DefaultTemplate from '../compontents/test.vue'

export default [
    { path: '/top', component: DefaultTemplate},
    { path: '/new', component: DefaultTemplate},
    { path: '/show', component: DefaultTemplate},
    { path: '/ask', component: DefaultTemplate},
    { path: '/job', component: DefaultTemplate},
    { path: '/', component: { template: '<div>bar</div>' }}
]