/*

Copyright (C) 2020 Richard Keizer, SalesFeed Nederland B.V.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/



  var taskq = function(maxconcurrency) {
    this.task = [];
    this.index = 0;
    this.maxconcurrency = maxconcurrency;
    this.nractive = 0;
    this.resolved = 0;
  };

  taskq.prototype.enqueue = function(task) {
    var p = async () => {
      return new Promise((resolve, reject) => {
        task((resolve) => {
          this.resolved++;
          this.nractive--;
          this.runNext();
        });
      })
    };
    this.task.push(p);
    this.runNext();
    return this;
  }

  taskq.prototype.runNext = function() {
    if (this.nractive == this.maxconcurrency) return;
    if (this.task.length == this.resolved) return this.ready();
    if (this.task.length == this.index) return;

    this.nractive++;
    this.task[this.index++]();

    return this;
  };

  taskq.prototype.ready = function() {
    return new Promise(resolve => this.ready = resolve);
  }




