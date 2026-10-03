import { Hono } from 'hono';
import { studentAuth } from '../../middlewares/studentAuth';
import chatApp from './chat';
import dashboardApp from './dashboard';
import sessionsApp from './sessions';
import topicsApp from './topics';

const studentApp = new Hono();

// Apply student authentication middleware to all student routes
studentApp.use('/*', studentAuth);

// Mount sub-routers
studentApp.route('/dashboard', dashboardApp);
studentApp.route('/topics', topicsApp);
studentApp.route('/questions', chatApp); // Using /questions because the route is /:questionId/chat
studentApp.route('/sessions', sessionsApp);

export default studentApp;
