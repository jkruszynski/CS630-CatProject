import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchComponent from './SearchComponent';
import {BreedPage} from './BreedPage';

const AppRouter = () => (
    <BrowserRouter>
        <div className="container">
            <Switch>
                <Route component={SearchComponent} path="/search" />
                <Route component={BreedPage} path="/details" />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;