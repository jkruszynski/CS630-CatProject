import {
    CardContent,
    Checkbox, createStyles,
    FormControl,
    Grid, Input,
    InputLabel,
    ListItemText,
    MenuItem, Theme,
    Typography, useTheme, Select, Paper, Button
} from "@material-ui/core";
import catpic from "../assets/cat.jpeg";
import {makeStyles} from "@material-ui/core/styles";
import React, {ChangeEvent, useEffect, useState} from "react";
import {stringify} from "querystring";
import {getAll, getFeatures, searchCats} from "../services/searchService";
import {BreedCard} from "./BreedCard";
import {BreedPage} from "./BreedPage";
import {Header} from "./Header";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    }),
);

export default function SearchComponent() {
    const classes = useStyles();
    const theme = useTheme();
    const [colorSelection, setColorSelection] = useState<string[]>([]);
    const [countrySelection, setCountrySelection] = useState<string[]>([]);
    const [activityLevel, setActivityLevel] = useState<string>('N/A');
    const [playfulness, setPlayfulness] = useState<string>('N/A');
    const [groomingLevel, setGroomingLevel] = useState<string>('N/A');
    const [vocality, setVocality] = useState<string>('N/A');
    const [friendliness, setFriendliness] = useState<string>('N/A');
    const [traits, setTraits] = useState<string>('N/A');
    const [disorders, setDisorders] = useState<string>('N/A');
    const [care, setCare] = useState<string>('N/A');
    const [nutrition, setNutrition] = useState<string>('N/A');
    const [behavior, setBehavior] = useState<string>('N/A');
    const [training, setTraining] = useState<string>('N/A');
    const [grooming, setGrooming] = useState<string>('N/A');
    const [results, setResults] = useState<Array<any>>([]);
    const [friendlinessOptions, setFriendlinessOptions] = useState<Array<any>>([]);
    const [traitOptions, setTraitOptions] = useState<Array<any>>([]);
    const [disorderOptions, setDisorderOptions] = useState<Array<any>>([]);
    const [careOptions, setCareOptions] = useState<Array<any>>([]);
    const [nutritionOptions, setNutritionOptions] = useState<Array<any>>([]);
    const [behaviorOptions, setBehaviorOptions] = useState<Array<any>>([]);
    const [trainingOptions, setTrainingOptions] = useState<Array<any>>([]);
    const [groomingOptions, setGroomingOptions] = useState<Array<any>>([]);
    const [colorOptions, setColorOptions] = useState<Array<any>>([]);
    const [countryOptions, setCountryOptions] = useState<Array<any>>([]);
    const [searching, setSearching] = useState<boolean>(true);
    const [selectedBreed, setSelectedBreed] = useState<any>({});

    const rangeOptions = [
        'N/A',
        'Low',
        'Moderate',
        'High'
    ];

    useEffect(() => {
        getFeatures('friendliness').then((data) => {
            setFriendlinessOptions(data);
        })
        getFeatures('color').then((data) => {
            setColorOptions(data);
        })
        getFeatures('countries').then((data) => {
            setCountryOptions(data);
        })
        getFeatures('traits').then((data) => {
            setTraitOptions(data);
        })
        getFeatures('disorders').then((data) => {
            setDisorderOptions(data);
        })
        getFeatures('care').then((data) => {
            setCareOptions(data);
        })
        getFeatures('nutrition').then((data) => {
            setNutritionOptions(data);
        })
        getFeatures('behavior').then((data) => {
            setBehaviorOptions(data);
        })
        getFeatures('training').then((data) => {
            setTrainingOptions(data);
        })
        getFeatures('grooming').then((data) => {
            setGroomingOptions(data);
        })
    }, [])


    const handleColorChange = (event: ChangeEvent<{ value: unknown }>) => {
        setColorSelection(event.target.value as string[]);
    };

    const handleCountryChange = (event: ChangeEvent<{ value: unknown }>) => {
        setCountrySelection(event.target.value as string[]);
    };

    const submitSearch = () => {
        setSearching(true)
        const searchParams = {
            activityLevel: activityLevel,
            color: colorSelection,
            countries: countrySelection,
            playfulness: playfulness,
            groomingLevel: groomingLevel,
            vocality: vocality,
            friendliness: friendliness,
            traits: traits,
            disorders: disorders,
            care: care,
            nutrition: nutrition,
            behavior: behavior,
            training: training,
            grooming: grooming
        }

        console.log(searchParams);
        searchCats(searchParams).then((data) => {
            setResults(data)
        });
    }

    const headerBreedSelection = (val: any) => {
        selectBreed(val);
    }

    const selectBreed = (breed: any) => {
        console.log(breed);
        setSelectedBreed(breed);
        setSearching(false);
    }

    return (
        <div>
            <Header onBreedSelection={headerBreedSelection}/>
            <div style={{ padding: '10px'}}>

                <Paper elevation={3} style={{ padding: '10px'}}>
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">Colors</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                multiple
                                value={colorSelection}
                                onChange={handleColorChange}
                                input={<Input />}
                                renderValue={(selected) => (selected as string[]).join(', ')}
                                // MenuProps={MenuProps}
                            >
                                {colorOptions.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={colorSelection.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">Origin</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                multiple
                                value={countrySelection}
                                onChange={handleCountryChange}
                                input={<Input />}
                                renderValue={(selected) => (selected as string[]).join(', ')}
                                // MenuProps={MenuProps}
                            >
                                {countryOptions.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={countrySelection.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">Playfulness</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                value={playfulness}
                                onChange={(e) => setPlayfulness(e.target.value as string)}
                            >
                                {rangeOptions.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">Activity Level</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                value={activityLevel}
                                onChange={(e) => setActivityLevel(e.target.value as string)}
                            >
                                {rangeOptions.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">Grooming Requirements</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                value={groomingLevel}
                                onChange={(e) => setGroomingLevel(e.target.value as string)}
                            >
                                {rangeOptions.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">Vocality</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                value={vocality}
                                onChange={(e) => setVocality(e.target.value as string)}
                            >
                                {rangeOptions.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">Friendliness</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                value={friendliness}
                                onChange={(e) => setFriendliness(e.target.value as string)}
                            >
                                {friendlinessOptions.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">Trait</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                value={traits}
                                onChange={(e) => setTraits(e.target.value as string)}
                            >
                                {traitOptions.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">Disorders</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                value={disorders}
                                onChange={(e) => setDisorders(e.target.value as string)}
                            >
                                {disorderOptions.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">Care</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                value={care}
                                onChange={(e) => setCare(e.target.value as string)}
                            >
                                {careOptions.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">Nutrition</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                value={nutrition}
                                onChange={(e) => setNutrition(e.target.value as string)}
                            >
                                {nutritionOptions.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">Behavior</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                value={behavior}
                                onChange={(e) => setBehavior(e.target.value as string)}
                            >
                                {behaviorOptions.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">Training</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                value={training}
                                onChange={(e) => setTraining(e.target.value as string)}
                            >
                                {trainingOptions.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">Grooming</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                value={grooming}
                                onChange={(e) => setGrooming(e.target.value as string)}
                            >
                                {groomingOptions.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <Button onClick={submitSearch} variant={'outlined'}>Search</Button>

                </Paper>
                <div style={{ display: 'flex' }}>
                {searching && results.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                {
                    results.map((breed) => {
                        return (
                            <div onClick={() => selectBreed(breed)} key={breed.breed} >
                                <BreedCard breedData={breed}/>
                            </div>
                        )
                    })
                }


                    </div>
                )}
                    {searching && results.length === 0 && <Typography variant={'h6'} style={{ padding: '10px'}}>No Matches</Typography>}
                </div>
                    <div>
                {!searching && selectedBreed && <BreedPage breedData={selectedBreed} />}
                    </div>
            </div>
        </div>
    )

}