import * as React from 'react';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import config from '../config/index.json';

const { pricing } = config;

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco Oakland Bay Bridge, United States',
    imgPath:
      'https://v.wpimg.pl/aWNhZ28uTjYvCiwBFw5DI2xSeFtRV011O0pgEBdNUWc2Rz4cTwUIOilGKl4XTFhkf1pqAQ1YUG93Wm8DC0RXbmELMltbFAY4YAIqVRoI',
  },
  {
    label: 'San Francisco Oakland Bay Bridge, United States',
    imgPath:
      'https://v.wpimg.pl/aWNhZ28uTjYvCiwBFw5DI2xSeFtRV011O0pgEBdNUWc2Rz4cTwUIOilGKl4XTFhkf1pqAQ1YUG93Wm8DC0RXbmELMltbFAY4YAIqVRoI',
  },
  {
    label: 'San Francisco Oakland Bay Bridge, United States',
    imgPath:
      'https://v.wpimg.pl/aWNhZ28uTjYvCiwBFw5DI2xSeFtRV011O0pgEBdNUWc2Rz4cTwUIOilGKl4XTFhkf1pqAQ1YUG93Wm8DC0RXbmELMltbFAY4YAIqVRoI',
  },
  {
    label: 'San Francisco Oakland Bay Bridge, United States',
    imgPath:
      'https://v.wpimg.pl/aWNhZ28uTjYvCiwBFw5DI2xSeFtRV011O0pgEBdNUWc2Rz4cTwUIOilGKl4XTFhkf1pqAQ1YUG93Wm8DC0RXbmELMltbFAY4YAIqVRoI',
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div
      id="about"
      className="mx-auto container xl:px-20 lg:px-12 sm:px-6 px-4 py-12"
    >
      <Box
        sx={{
          maxWidth: 400,
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
        >
          {pricing.title.split(' ').map((word, index) => (
            <span
              key={index}
              className={index % 2 ? 'text-primary' : 'text-border'}
            >
              {word}{' '}
            </span>
          ))}
        </h1>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 350,
                    display: 'flex',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </div>
  );
}

export default SwipeableTextMobileStepper;
