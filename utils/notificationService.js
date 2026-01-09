import sendEmail from './sendEmail.js';
import sendSMS from './sendSMS.js';

// Centralized service to handle different types of notifications
const notificationService = {
  // Welcome New Employee
  sendWelcomeNotification: async (user, password) => {
    const message = `Welcome to NexusHR, ${user.name}! \n\nYour account has been created.\nEmail: ${user.email}\nPassword: ${password}\n\nPlease login and change your password immediately.`;
    
    await sendEmail({
      email: user.email,
      subject: 'Welcome to NexusHR',
      message,
    });
    
    // Optional: Send SMS if phone number exists
    // if (user.phone) await sendSMS(user.phone, `Welcome to NexusHR, ${user.name}! Check your email for login details.`);
  },

  // Leave Request Notification (To Manager)
  notifyManagerLeaveRequest: async (manager, employee, leaveRequest) => {
    const message = `Employee ${employee.name} has requested leave.\nType: ${leaveRequest.leaveType}\nDates: ${new Date(leaveRequest.startDate).toDateString()} - ${new Date(leaveRequest.endDate).toDateString()}\nReason: ${leaveRequest.reason}`;

    if (manager.email) {
      await sendEmail({
        email: manager.email,
        subject: 'New Leave Request Action Required',
        message,
      });
    }
  },

  // Leave Status Update (To Employee)
  notifyEmployeeLeaveStatus: async (employee, leaveRequest) => {
    const message = `Your leave request for ${new Date(leaveRequest.startDate).toDateString()} has been ${leaveRequest.status}.`;
    
    await sendEmail({
      email: employee.email,
      subject: `Leave Request ${leaveRequest.status}`,
      message,
    });

    // if (employee.phone) await sendSMS(employee.phone, message);
  },
  
  // Payroll Processed (To Employee)
  notifyPayrollProcessed: async (employee, payroll) => {
    const message = `Your payroll for ${payroll.month}/${payroll.year} has been processed.\nNet Salary: $${payroll.netSalary}`;
    
    await sendEmail({
      email: employee.email,
      subject: 'Payslip Generated',
      message,
    });
  },

  // Job Application Received (To Applicant)
  notifyApplicant: async (applicant, jobTitle) => {
    const message = `Dear ${applicant.name},\n\nThank you for applying for the position of ${jobTitle} at NexusHR. We have received your application and will review it shortly.\n\nBest Regards,\nRecruitment Team`;
    
    await sendEmail({
      email: applicant.email,
      subject: 'Application Received - NexusHR',
      message,
    });
  }
};

export default notificationService;
