import R from 'ramda';

let Engine = (configuration) => {

  var engine = {

    byName: (name) => R.find(R.propEq('name', name))(configuration),

    nameValuePairs: R.map((dependency) => {

      var name = dependency.replace('$', '');

      return { 
        name: dependency,
        value: engine.get(name) 
      };

    }),

    formulaWithValues: R.reduce((acc, pair) => {
      var re = new RegExp(pair.name.replace('$', '\\$'), 'g');
      return R.replace(re, pair.value, acc);
    }),


    /* --- Meat and potatoes --- */

    get (name) {
    
      var { value, formula } = engine.byName(name);

      if (typeof value !== 'undefined') {
        return value;
      }

      if (typeof formula !== 'undefined') {

        var dependencies = Engine.getDependencies(formula);
        var pairs = engine.nameValuePairs(dependencies);
        var formula_with_values = engine.formulaWithValues(formula, pairs);

        return eval(formula_with_values);

      }

    },

  };

  return engine;

};

Engine.getDependencies = (formula) => {

  var re = /\$\w*/g;

  return R.pipe(
    R.uniq
  )(formula.match(re));

};

export default Engine;
