/*global describe, it, beforeEach*/

import {expect} from 'chai';
import Engine from './index';

describe('Engine', () => {
  
  describe('byName', () => {
    
    it('find a configuration item by name', () => {

      var item = { name: 'item', value: 500 };
      var engine = Engine([ item ]);

      var result = engine.byName('item');

      expect(result).to.equal(item);

    });

  });

  describe('getDependencies', () => {

    it('returns the names of all the dependencies', () => {

      var result = Engine.getDependencies('($value - $cost) / $cost * 100 / $value1 + $foo_bar');
      var expected = ['$value', '$cost', '$value1', '$foo_bar'];

      expect(result).to.eql(expected);

    });

  });

  /* --- Meat and potatoes --- */

  describe('get', () => {
    
    var configuration, engine;

    beforeEach(() => {

      configuration = [

        { name: 'value1', value: 200, },
        { name: 'value2', value: 200, },
        { name: 'cost1', value: 100, },
        { name: 'cost2', value: 100, },

        {
          name: 'totalCosts',
          formula: '$cost1 + $cost2'
        },

        {
          name: 'totalValues',
          formula: '$value1 + $value2'
        },

        {
          name: 'roi',
          formula: '(($totalValues - $totalCosts) / $totalCosts) * 100',
        }

      ];

      engine = Engine(configuration);

    });

    it('returns a value result', () => {

      var result = engine.get('value1');
      var expected = 200;

      expect(result).to.eql(expected);
      
    });

    it('returns a formula value', () => {

      var result = engine.get('roi');
      var expected = 100;

      expect(result).to.eql(expected);

    });

  });

});
