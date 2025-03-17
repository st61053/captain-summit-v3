import { Box, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { IconEnum, iconMap } from '../../assets/icons';

const TaskList = () => {

    const { roleQuests } = useSelector((state: RootState) => state.quest);
    const { user } = useSelector((state: RootState) => state.user);

    if (!user) return null;
    const { roleQuests: tasks } = user;


    const activeStep = tasks?.length ?? 0;

    return (
        <Box sx={{
            p: 2,
            pr: 3
        }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {roleQuests.map((step, index) => (
                    <Step key={step.id}>
                        <StepLabel
                        >
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                <Typography variant='subtitle1'>{step.title}</Typography>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5
                                }}>
                                    <Typography variant="body1">{step.reward}</Typography>
                                    <img src={iconMap[IconEnum.COIN]} alt="coin" height={18} width={18} />
                                </Box>
                            </Box>
                        </StepLabel>
                        <StepContent>
                            <Typography sx={{ pt: 2 }} variant='body2' color='grey'>{step.description}</Typography>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    )
}

export default TaskList