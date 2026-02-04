import { useMutation } from '@tanstack/react-query';
import { generateVideo } from '../services/api';

// Define the input type based on api.ts
interface VideoGenerationPayload {
    theme: string | null;
    image: string | null;
    clientId: string | null;
}

export const useGenerateVideo = () => {
    return useMutation({
        mutationFn: (data: VideoGenerationPayload) => generateVideo(data),
        onSuccess: (data) => {
            console.log('Video generation successful:', data);
        },
        onError: (error) => {
            console.error('Video generation failed:', error);
        }
    });
};
