import { Inngest } from "inngest";
import User from "../models/User.js";

// ✅ Create a single Inngest client
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// ✅ Inngest function to save user data to DB
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-creation" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        image: image_url,
      };

      await User.create(userData);
      console.log(`✅ User created in DB: ${userData.email}`);
    } catch (error) {
      console.error("❌ Error creating user:", error);
    }
  }
);

// ✅ Inngest function to delete user from DB
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      const { id } = event.data;
      await User.findByIdAndDelete(id);
      console.log(`✅ User deleted from DB: ${id}`);
    } catch (error) {
      console.error("❌ Error deleting user:", error);
    }
  }
);

// ✅ Inngest function to update user in DB
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-with-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      const userData = {
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        image: image_url,
      };

      await User.findOneAndUpdate({ _id: id }, userData, { new: true });
      console.log(`✅ User updated in DB: ${userData.email}`);
    } catch (error) {
      console.error("❌ Error updating user:", error);
    }
  }
);

// ✅ Export all functions
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
