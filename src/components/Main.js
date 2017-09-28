import React from 'react';
import {SearchEns} from './SearchEns';
import {Content} from './Content';
import {FAQ} from './FAQ';
import {About} from './About';
import './Main.css';

export const Main = () => (
  <div>
    <SearchEns />
    <hr/>
    <Content />
    <FAQ />
    <About />
  </div>
);