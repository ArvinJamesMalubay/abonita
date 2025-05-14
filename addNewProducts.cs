using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MySql.Data.MySqlClient;
using System.Xml.Linq;
using System.IO;

namespace Sales_Order
{
    public partial class addNewProducts : Form
    {
        private string connectionString;
        private byte[] imageData;
        public addNewProducts(string connectionString)
        {
            InitializeComponent();
            this.connectionString = connectionString;
            LoadSuppliers(); // Populate the supplier dropdown
            GenerateSKU();
            uploadButton.Click += UploadButton_Click;
        }
        private void UploadButton_Click(object sender, EventArgs e)
        {
            using (OpenFileDialog openFileDialog = new OpenFileDialog())
            {
                openFileDialog.Filter = "Image Files|*.jpg;*.jpeg;*.png;*.bmp";
                if (openFileDialog.ShowDialog() == DialogResult.OK)
                {
                    string filePath = openFileDialog.FileName;
                    pictureBox1.Image = Image.FromFile(filePath); // Display the image in pictureBox1

                    // Convert the image to a byte array
                    using (MemoryStream ms = new MemoryStream())
                    {
                        pictureBox1.Image.Save(ms, pictureBox1.Image.RawFormat);
                        imageData = ms.ToArray();
                    }
                }
            }
        }
        private void LoadSuppliers()
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "SELECT id, name FROM suppliers"; // Fetch supplier ID and name
                    MySqlCommand command = new MySqlCommand(query, connection);
                    MySqlDataAdapter adapter = new MySqlDataAdapter(command);
                    DataTable suppliersTable = new DataTable();
                    adapter.Fill(suppliersTable);

                    supplierName.DataSource = suppliersTable; // Bind data to dropdown
                    supplierName.DisplayMember = "name";      // Display supplier name
                    supplierName.ValueMember = "id";         // Use supplier ID as value
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Failed to load suppliers: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private void GenerateSKU()
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "SELECT MAX(id) FROM products"; // Get the highest product ID
                    MySqlCommand command = new MySqlCommand(query, connection);
                    object result = command.ExecuteScalar();

                    int nextId = (result != DBNull.Value) ? Convert.ToInt32(result) + 1 : 1;
                    txtsku.Text = $"PROD-{nextId:D3}"; // Format as PROD-001, PROD-002, etc.
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Failed to generate SKU: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }
        private void unitPrice_KeyPress(object sender, KeyPressEventArgs e)
        {
            // Allow only digits, one decimal point, and control characters (e.g., backspace)
            if (!char.IsControl(e.KeyChar) && !char.IsDigit(e.KeyChar) && e.KeyChar != '.')
            {
                e.Handled = true; // Reject the input
            }

            // Allow only one decimal point
            if (e.KeyChar == '.' && (sender as TextBox).Text.Contains("."))
            {
                e.Handled = true; // Reject the input
            }
        }

        private void btn_save_Click(object sender, EventArgs e)
        {
            string name = supplierName.Text;
            string sku = txtsku.Text;
            string desc = description.Text;
            string categories = category.Text;
            bool isActive = isAvailable.Checked;
            string price = unitPrice.Text;
            string unit = units.Text;
            string stock = quantity.Text;
            int supplierId = Convert.ToInt32(supplierName.SelectedValue); // Get selected supplier ID

            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(sku))
            {
                MessageBox.Show("Name and SKU are required fields.", "Validation Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "INSERT INTO products (sku, name, description,category, unit_price, unit, stock_quantity, supplier_id,status, image_data) " +
                                   "VALUES (@sku, @name, @desc,@categories, @price, @unit, @stock, @supplierId,@isAvailable, @imageData)";
                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@sku", sku);
                        command.Parameters.AddWithValue("@name", name);
                        command.Parameters.AddWithValue("@desc", desc);
                        command.Parameters.AddWithValue("@price", price);
                        command.Parameters.AddWithValue("@categories", categories);
                        command.Parameters.AddWithValue("@unit", unit);
                        command.Parameters.AddWithValue("@stock", stock);
                        command.Parameters.AddWithValue("@supplierId", supplierId);
                        command.Parameters.AddWithValue("@isAvailable", isActive);
                        command.Parameters.AddWithValue("@imageData", imageData ?? (object)DBNull.Value); 

                        command.ExecuteNonQuery();
                        MessageBox.Show("Product added successfully!", "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
                        this.DialogResult = DialogResult.OK;
                        this.Close();
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Failed to add product: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private void addNewProducts_Load(object sender, EventArgs e)
        {

        }
    }
}
