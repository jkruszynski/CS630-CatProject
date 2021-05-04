import {
    AppBar, Grid,
    Tab,
    Tabs, Typography,
} from "@material-ui/core";
import {ChangeEvent, FC, useEffect, useState} from "react";
import TabPanel from "./TabPanel";

export type BreedPageProps = {
    breedData?: any
};

export const BreedPage: FC<BreedPageProps> = ({ breedData = {} }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    function a11yProps(index: any) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <div style={{ display: 'flex'}}>
            <div style={{ padding: '5px'}}>
                <img src={breedData.image} alt={'cat'} height='130px' width='130px'/>
                <Typography>{ breedData.breed }</Typography>
            </div>
            <div style={{ display: 'inline-block'}}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Basic Info" {...a11yProps(0)} />
                        <Tab label="Problems" {...a11yProps(1)} />
                        <Tab label="Instructions" {...a11yProps(2)} />
                        <Tab label="Nutrition" {...a11yProps(3)} />
                        <Tab label="Behavior" {...a11yProps(4)} />
                        <Tab label="Grooming" {...a11yProps(5)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Typography>Country of Origin: { breedData.countries }</Typography>
                    <Typography>Playfulness: { breedData.playfulness }</Typography>
                    <Typography>Activity Level: { breedData.activityLevel }</Typography>
                    <Typography>Friendliness: { breedData.friendliness }</Typography>
                    <Typography>Grooming Requirements: { breedData.groomingLevel }</Typography>
                    <Typography>Vocality: { breedData.vocality }</Typography>
                    <Typography>General Traits: { breedData.traits }</Typography>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Typography>Breed Disorders: { breedData.disorders }</Typography>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Typography>Instructions: { breedData.care }</Typography>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Typography>Nutrition: { breedData.nutrition }</Typography>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <Typography>Behavior: { breedData.behavior }</Typography>
                    <Typography>Training: { breedData.training }</Typography>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <Typography>Grooming: { breedData.grooming }</Typography>
                </TabPanel>
            </div>
        </div>
    )
}