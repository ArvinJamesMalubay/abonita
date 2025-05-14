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

namespace Sales_Order
{
    public partial class productUserControl : UserControl
    {
        private string connectionString = "Server=localhost;Database=abonita_sales;user=root;Password=;";
        private DataTable customerDataTable;
        public productUserControl()
        {
            InitializeComponent();
            LoadProductData();
        }
        private void LoadProductData()
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "SELECT sku, name,description, category, unit_price, unit, stock_quantity FROM products"; 
                    MySqlDataAdapter adapter = new MySqlDataAdapter(query, connection);
                    customerDataTable = new DataTable();
                    adapter.Fill(customerDataTable);

                    dataGridView2.DataSource = customerDataTable;
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Failed to load products data: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }

        }
        private void button1_Click(object sender, EventArgs e)
        {
            // Open a new form to collect customer details
            using (var addNewProducts = new addNewProducts(connectionString))
            {
                if (addNewProducts.ShowDialog() == DialogResult.OK)
                {
                    // Reload the customer data after a successful insert
                    LoadProductData();
                }
            }
        }

        private void TextBox1_TextChanged_1(object sender, EventArgs e)
        {
            if (customerDataTable != null)
            {
                string filterText = TextBox1.Text;
                if (!string.IsNullOrEmpty(filterText))
                {
                    customerDataTable.DefaultView.RowFilter = $"name LIKE '%{filterText}%' OR sku LIKE '%{filterText}%'";
                }
                else
                {
                    customerDataTable.DefaultView.RowFilter = string.Empty; 
                }
            }
        }
    }
}
