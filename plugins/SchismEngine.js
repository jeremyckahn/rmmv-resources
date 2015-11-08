/* global Game_Variables:true, $dataSystem:true */
/*:
 * @plugindesc The Schism engine extensions for RPG Maker MV.
 * @author Jeremy Kahn
 *
 * @help Extends the RPG Maker MV JavaScript engine with the following features:
 *
 * * String support for game variables
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
} ());
