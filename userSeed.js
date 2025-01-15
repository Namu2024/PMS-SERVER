import User from './models/User.js';
import bcrypt from 'bcrypt';
import connectToDatabase from './db/db.js';

const userRegister = async () => {
  await connectToDatabase(); // Ensure database connection is awaited

  try {
    // Create admin user
    const hashAdminPassword = await bcrypt.hash("admin", 10);
    const adminUser = new User({
      name: "Admin",
      email: "it.sdcllp@gmail.com",
      password: hashAdminPassword,
      role: "admin"
    });
    
    await adminUser.save(); // Save admin user

    // Create employee user
    const hashUserPassword = await bcrypt.hash("sdc2021", 10);
    const employeeUser = new User({
      name: "Shivam",
      email: "aim.sdcllp@gmail.com",
      password: hashUserPassword,
      role: "employee"
    });

    await employeeUser.save(); // Save employee user

    console.log("Users registered successfully!");

  } catch (error) {
    console.log("Error registering users:", error);
  }
}

userRegister();
