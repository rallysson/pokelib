import React from 'react';
import { map } from 'lodash/fp';
import PropTypes from 'prop-types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const Status = ({ pokemon }) => {
  const data = pokemon && map((el) => ({ subject: el.stat.name.replace('-', ' '), A: el.base_stat, fullMark: 160 }), pokemon.stats);

  return (
    <RadarChart cx={250} cy={200} outerRadius={150} width={500} height={500} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 160]} />
      <Radar name="Poke" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    </RadarChart>
  );
};

export default Status;

Status.propTypes = {
  pokemon: PropTypes.object.isRequired,
};
