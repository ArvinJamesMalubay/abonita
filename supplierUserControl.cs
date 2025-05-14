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
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace Sales_Order
{
    public partial class supplierUserControl : UserControl
    {
        private string connectionString = "Server=localhost;Database=abonita_sales;user=root;Password=;";
        private DataTable customerDataTable;
        public supplierUserControl()
        {
            InitializeComponent();
            LoadSupplierData();
        }
        private void LoadSupplierData()
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "SELECT  name,email, phone, address, contact_person, status FROM suppliers";
                    MySqlDataAdapter adapter = new MySqlDataAdapter(query, connection);
                    customerDataTable = new DataTable();
                    adapter.Fill(customerDataTable);

                    dataGridView2.DataSource = customerDataTable;
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Failed to load suppliers data: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {
            if (customerDataTable != null)
            {
                string filterText = textBox1.Text;
                if (!string.IsNullOrEmpty(filterText))
                {
                    customerDataTable.DefaultView.RowFilter = $"name LIKE '%{filterText}%' OR email LIKE '%{filterText}%'";
                }
                else
                {
                    customerDataTable.DefaultView.RowFilter = string.Empty;
                }
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            // Open a new form to collect customer details
            using (var addNewSupplier = new addNewSupplier(connectionString))
            {
                if (addNewSupplier.ShowDialog() == DialogResult.OK)
                {
                    // Reload the customer data after a successful insert
                    LoadSupplierData();
                }
            }
        }
    }
}
