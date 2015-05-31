// dao/userSqlMapping.js
// CRUD SQL语句
var stock_list = {
insert:'INSERT INTO stock_list(id, name, number) VALUES(0,?,?)',
update:'update stock_list set name=?, number=? where id=?',
delete: 'delete from stock_list where id=?',
queryById: 'select * from stock_list where id=?',
queryAll: 'select * from stock_list'
};

module.exports = stock_list;