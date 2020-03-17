const add_categories = 'INSERT INTO tbl_categories (name_category, photo, created_on, updated_on) VALUES(?,?,?,?)'
const detail_categories = 'SELECT * FROM tbl_categories WHERE id_category=?'
const showall_categories = 'SELECT * FROM tbl_categories'
const edit_categories = `UPDATE tbl_categories SET name_category=?, photo=?, updated_on=? WHERE id_category=?`
const delete_categories = 'DELETE FROM tbl_categories WHERE id_category=?'

module.exports = {add_categories, detail_categories, showall_categories, edit_categories, delete_categories}