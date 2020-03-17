const add_user = 'INSERT INTO tbl_users (first_name, last_name, email, password, photo, id_role, created_on, updated_on) VALUES(?,?,?,?,?,?,?,?)'
const detail_user = 'SELECT * FROM tbl_users WHERE id_user=?'
const edit_user = `UPDATE tbl_users SET first_name=?, last_name=?, email=?, password=?, photo=?, id_role=?, updated_on=? WHERE id_user=?`
const delete_user = 'DELETE FROM tbl_users WHERE id_user=?'

module.exports = {add_user, detail_user, edit_user, delete_user}