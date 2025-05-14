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
    public partial class customerUserControl : UserControl
    {
        private string connectionString = "Server=localhost;Database=abonita_sales;user=root;Password=;";
        private DataTable customerDataTable;
        public customerUserControl()
        {
            InitializeComponent();
            LoadCustomerData();
            textBox1.TextChanged += TextBox1_TextChanged;
        }
        private void LoadCustomerData()
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "SELECT name, email, address, status FROM customers"; // Adjust the query based on your table structure
                    MySqlDataAdapter adapter = new MySqlDataAdapter(query, connection);
                    customerDataTable = new DataTable();
                    adapter.Fill(customerDataTable);

                    dataGridView2.DataSource = customerDataTable;// Bind the data to the DataGridView
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Failed to load customer data: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }
        private void TextBox1_TextChanged(object sender, EventArgs e)
        {
            if (customerDataTable != null)
            {
                string filterText = textBox1.Text;
                if (!string.IsNullOrEmpty(filterText))
                {
                    // Filter rows where any column contains the search text
                    customerDataTable.DefaultView.RowFilter = $"name LIKE '%{filterText}%' OR email LIKE '%{filterText}%'";
                }
                else
                {
                    customerDataTable.DefaultView.RowFilter = string.Empty; // Clear the filter
                }
            }
        }

        //private void button1_Click(object sender, EventArgs e)
        //{
        //    // Open a new form to collect customer details
        //    using (var addNewCostumersForm = new addNewCostumersForm(connectionString))
        //    {
        //        if (addNewCostumersForm.ShowDialog() == DialogResult.OK)
        //        {
        //            // Reload the customer data after a successful insert
        //            LoadCustomerData();
        //        }
        //    }
        //}
    }
}
