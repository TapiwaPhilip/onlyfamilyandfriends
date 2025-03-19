
import { supabase } from '@/integrations/supabase/client';

// Types of notifications we can generate
const notificationTypes = ['booking', 'invitation', 'property', 'message'];

// Sample messages for each notification type
const sampleMessages = {
  booking: [
    'Your booking request has been approved',
    'Your booking request is pending review',
    'A guest has requested to book your property',
    'Your upcoming stay is in 2 days',
    'Your booking has been confirmed'
  ],
  invitation: [
    'You received a new invitation to collaborate',
    'Your invitation has been accepted',
    'Someone invited you to manage their property',
    'New family member added to your circle',
    'An invitation is pending your response'
  ],
  property: [
    'Your property listing has been published',
    'Your property has a new review',
    'Property price updated successfully',
    'Property details have been updated',
    'New property availability dates added'
  ],
  message: [
    'You have a new message from a guest',
    'Property owner sent you a message',
    'New message regarding your upcoming stay',
    'Message received about your property',
    'New communication from support team'
  ]
};

// Create a batch of demo notifications for a user
export async function createDemoNotifications(userId: string, count: number = 5) {
  if (!userId) return;
  
  const notifications = [];
  
  for (let i = 0; i < count; i++) {
    // Pick a random notification type
    const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    
    // Pick a random message for the selected type
    const messages = sampleMessages[type as keyof typeof sampleMessages];
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    // Create a notification with random read status (more likely to be unread for demo purposes)
    notifications.push({
      user_id: userId,
      type,
      message,
      is_read: Math.random() > 0.7, // 30% chance of being read
      related_id: null
    });
  }
  
  // Insert the notifications into the database
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notifications)
      .select();
      
    if (error) {
      console.error('Error creating demo notifications:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error creating demo notifications:', error);
    return null;
  }
}
