
import { useState } from 'react';
import { format } from 'date-fns';
import { Notification } from '@/types/supabase';
import { MessageSquare, Users, Calendar, Home, CheckCircle2, X, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => Promise<void>;
}

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const [isMarking, setIsMarking] = useState(false);
  
  const handleMarkAsRead = async () => {
    if (notification.is_read) return;
    
    setIsMarking(true);
    await onMarkAsRead(notification.id);
    setIsMarking(false);
  };
  
  // Select icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case 'booking':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'invitation':
        return <Users className="h-5 w-5 text-green-500" />;
      case 'property':
        return <Home className="h-5 w-5 text-purple-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div 
      className={cn(
        "flex items-start p-4 border-b transition-colors",
        !notification.is_read && "bg-blue-50 dark:bg-blue-950/20"
      )}
    >
      <div className="flex-shrink-0 mr-4">
        {getIcon()}
      </div>
      
      <div className="flex-grow">
        <p className="text-sm font-medium">{notification.message}</p>
        <p className="text-xs text-gray-500 mt-1">
          {format(new Date(notification.created_at), 'MMM d, yyyy · h:mm a')}
        </p>
      </div>
      
      {!notification.is_read && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="flex-shrink-0"
          onClick={handleMarkAsRead}
          disabled={isMarking}
        >
          <CheckCircle2 className="h-4 w-4 text-gray-500" />
          <span className="sr-only">Mark as read</span>
        </Button>
      )}
    </div>
  );
}
