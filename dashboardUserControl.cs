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
    public partial class dashboardUserControl : UserControl
    {
        private string connectionString = "Server=localhost;Database=abonita_sales;user=root;Password=;";
        public dashboardUserControl()
        {
            InitializeComponent();
            LoadCustomerCount();
            LoadProductCount();
            LoadSupplierCount();
            customerLink.Click += CustomerLink_Click;
            linkLabel2.Click += linkLabel2_Click;
            quotationLink.Click += quotationLink_Click;
        }
        private void LoadCustomerCount()
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "SELECT COUNT(*) FROM customers"; // Query to count customers
                    MySqlCommand command = new MySqlCommand(query, connection);
                    int customerCount = Convert.ToInt32(command.ExecuteScalar());

                    // Add a label to display the customer count
                    Label customerCountLabel = new Label
                    {
                        Text = $"{customerCount}",
                        Font = new System.Drawing.Font("Microsoft Sans Serif", 32F),
                        Location = new System.Drawing.Point(55, 50),
                        ForeColor = Color.BlueViolet,
                        AutoSize = true
                    };
                    cutomerPanel.Controls.Add(customerCountLabel);
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Failed to load customer count: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }
        private void LoadProductCount()
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "SELECT COUNT(*) FROM products"; // Query to count customers
                    MySqlCommand command = new MySqlCommand(query, connection);
                    int productCount = Convert.ToInt32(command.ExecuteScalar());

                    // Add a label to display the customer count
                    Label productCountLabel = new Label
                    {
                        Text = $"{productCount}",
                        Font = new System.Drawing.Font("Microsoft Sans Serif", 32F),
                        Location = new System.Drawing.Point(55, 50),
                        ForeColor = Color.Green,
                        AutoSize = true
                    };
                    productPanel.Controls.Add(productCountLabel);
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Failed to load customer count: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }
        private void LoadSupplierCount()
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "SELECT COUNT(*) FROM suppliers"; // Query to count customers
                    MySqlCommand command = new MySqlCommand(query, connection);
                    int productCount = Convert.ToInt32(command.ExecuteScalar());

                    // Add a label to display the customer count
                    Label productCountLabel = new Label
                    {
                        Text = $"{productCount}",
                        Font = new System.Drawing.Font("Microsoft Sans Serif", 32F),
                        Location = new System.Drawing.Point(55, 50),
                        ForeColor = Color.CadetBlue,
                        AutoSize = true
                    };
                    quotationPanel.Controls.Add(productCountLabel);
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Failed to load customer count: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }
        private void CustomerLink_Click(object sender, EventArgs e)
        {
            // Navigate to customerUserControl
            Form1 mainForm = this.FindForm() as Form1;
            if (mainForm != null)
            {
                mainForm.panel.Controls.Clear();
                customerUserControl customerControl = new customerUserControl();
                mainForm.panel.Controls.Add(customerControl);
                customerControl.Dock = DockStyle.Fill;
            }
        }

        private void linkLabel2_Click(object sender, EventArgs e)
        {
            // Navigate to customerUserControl
            Form1 mainForm = this.FindForm() as Form1;
            if (mainForm != null)
            {
                mainForm.panel.Controls.Clear();
                productUserControl productControl = new productUserControl();
                mainForm.panel.Controls.Add(productControl);
                productControl.Dock = DockStyle.Fill;
            }
        }

        private void quotationLink_Click(object sender, EventArgs e)
        {
            // Navigate to customerUserControl
            Form1 mainForm = this.FindForm() as Form1;
            if (mainForm != null)
            {
                mainForm.panel.Controls.Clear();
                supplierUserControl supplierControl = new supplierUserControl();
                mainForm.panel.Controls.Add(supplierControl);
                supplierControl.Dock = DockStyle.Fill;
            }
        }
    }
}
