
import React from 'react'
import { createConversation } from '../api/MessagesData'
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function MessageButton({ otherUserId, loggedInUserId }) {


  const router = useRouter(); 
  const {
    mutate: createConversationMutation,
    isLoading,
    error,
  } = useMutation({
    mutationFn: () => createConversation(loggedInUserId, otherUserId),
    onSuccess: (conversationData) => {
      
      if (conversationData && conversationData.id) {
        router.push(`/chats/${conversationData.id}`);
      } 
    },
    onError: (error) => {
      console.error('Error creating conversation:', error);
    },
  });

  if (!otherUserId || !loggedInUserId) {
    return null; 
  }

  if (isLoading) {
    return <div>Creating conversation...</div>;
  }

  return (
    <>
      {error && <div>Error loading messages: {error.message}</div>} {/* Show error if any */}

      <button
        onClick={() => createConversationMutation()} // Call the mutation on button click
        className="bg-slate-200 p-3 rounded-md hover:bg-purple-500 hover:text-white transition duration-200"
      >
        Message
      </button>
    </>
  );
}