import React from 'react';
import { Box } from '@mui/material';
import Lottie from 'react-lottie';
import filledStarAnimation from '../animation/filledStarAnimation.json'; // Animation for filled stars
import emptyStarAnimation from '../animation/emptyStarAnimation.json'; // Animation for empty stars
import StarPurple500SharpIcon from '@mui/icons-material/StarPurple500Sharp';

const StarRating = ({ averageReview }) => {
    // Options for filled and empty star animations
    const filledStarOptions = {
        loop: false,
        autoplay: true, 
        animationData: filledStarAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const emptyStarOptions = {
        loop: false,
        autoplay: true, 
        animationData: emptyStarAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        
        <Box display='flex' sx={{ gap: '0px' }}> {/* Adjust gap size here */}
            {[...Array(5)].map((_, index) => (
                <Box key={index} sx={{ fontSize: '50px' }}>
                    {index < averageReview ? (
                        
                            <Lottie 
                                options={filledStarOptions} 
                                height={100} 
                                width={50} 
                            />
                        
                    ) : (
                        
                            <StarPurple500SharpIcon sx={{ fontSize: '42px', color: 'gray',mt:'26.9px' }} />
                        
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default StarRating;
