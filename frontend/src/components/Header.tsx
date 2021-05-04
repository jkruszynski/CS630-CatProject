import React, {FC, useEffect, useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {InputBase, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {Home, Person, PersonOutline} from "@material-ui/icons";
import {getAll} from "../services/searchService";
import {BreedPage} from "./BreedPage";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export type HeaderProps = {
    onBreedSelection?: any
};

export const Header: FC<HeaderProps> = ({ onBreedSelection }) => {
    const classes = useStyles();
    const [searchData, setSearchData] = useState<Array<any>>([]);
    // const [selectedBreed, setSelectedBreed] = useState<any>({});

    useEffect(() => {
        getAll().then((data) => {
            setSearchData(data)
        })
    }, [])

    const breedSelected = (e: any, v: any) => {
        onBreedSelection(v);
        // onSelectBreed(v);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Home/> Home
                    </IconButton>

                    <div className={classes.search} style={{ width: '100%' }}>
                        <Autocomplete
                            id="combo-box-demo"
                            options={searchData}
                            getOptionLabel={(option) => option.breed}
                            onChange={(e, v) => breedSelected(e, v)}
                            renderInput={(params) => <TextField {...params} label="Cat Breed" variant="outlined" />}
                        />
                    </div>
                    <IconButton color="inherit" edge="end" className={classes.menuButton} ><Person/> User</IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
