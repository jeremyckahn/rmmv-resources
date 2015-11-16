/* global _:true, Game_Variables:true, $dataItems: true, $dataSystem:true, $gameVariables: true, DataManager:true */
/*:
 * @plugindesc The SchismEngine extensions for RPG Maker MV.  Depends on Lodash
 * (https://lodash.com/).
 * @author Jeremy Kahn
 *
 * @help Extends the RPG Maker MV JavaScript engine with the following features:
 *
 * * String support for Game_Variables
 * * DataManager convenience methods
 */

(function () {
  'use strict';
  var _setValue = Game_Variables.prototype.setValue;

  Game_Variables.prototype.setValue = function(variableId, value) {
    if (typeof value === 'number') {
      return _setValue.apply(this, arguments);
    }

    if (typeof value === 'string' &&
      variableId < $dataSystem.variables.length) {
      this._data[variableId] = value;
      this.onChange();
    }
  };

  /**
   * @param {string} variableName
   */
  DataManager.getVariableIndexByName = function (variableName) {
    return $dataSystem.variables.indexOf(variableName);
  };

  /**
   * @param {string} name
   * @param {number|string} value
   */
  DataManager.setVariableByName = function (name, value) {
    var variableId = DataManager.getVariableIndexByName(name);
    $gameVariables.setValue(variableId, value);
  };

  /**
   * @param {number} id
   */
  DataManager.getItemDataById = function (id) {
    return _.findWhere($dataItems, { id: id });
  };

  /**
   * @param {string} variableName
   * @return {number}
   */
  DataManager.incrementVariableByName = function (variableName) {
    var variableId = DataManager.getVariableIndexByName(variableName);
    var currentValue = $gameVariables.value(variableId);
    var newValue = currentValue + 1;
    $gameVariables.setValue(variableId, newValue);

    return newValue;
  };
} ());
