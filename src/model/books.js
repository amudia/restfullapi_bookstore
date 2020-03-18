const add_books = 'INSERT INTO tbl_books (photo, id_category, title, author, publisher, sinopsis, year, edition, quantity, paper_type, price, dimension, num_of_pages, created_on, updated_on) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
const detail_books = 'SELECT * FROM tbl_books WHERE id_books=?'
const showall_books = 'SELECT * FROM tbl_books'
const edit_books = `UPDATE tbl_books SET photo=?, id_category=?, title=?, author=?, publisher=?, sinopsis=?, year=?, edition=?, quantity=?, paper_type=?, price=?, dimension=?, num_of_pages=?, updated_on=? WHERE id_books=?`
const delete_books = 'DELETE FROM tbl_books WHERE id_books=?'

module.exports = {add_books, detail_books, showall_books, edit_books, delete_books}