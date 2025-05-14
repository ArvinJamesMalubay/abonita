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
    public partial class apitestUserControl : UserControl
    {
        public apitestUserControl()
        {
            InitializeComponent();
            button1.Click += button1_Click;
        }
        string connectionString = "Server=localhost;Database=abonita_sales;user=root;Password=;";

        private void button1_Click(object sender, EventArgs e)
        {
            panel1.Controls.Clear(); // Clear previous status messages
            Label statusLabel = new Label
            {
                AutoSize = true,
                Font = new System.Drawing.Font("Microsoft Sans Serif", 24F),
                Location = new System.Drawing.Point(10, 40), // Position inside the panel
                ForeColor = System.Drawing.Color.Black
            };
            Label stringconnection = new Label
            {
                AutoSize = true,
                Font = new System.Drawing.Font("Microsoft Sans Serif", 12F),
                Location = new System.Drawing.Point(10, 100), // Position inside the panel
                ForeColor = System.Drawing.Color.Black
            };

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    statusLabel.Text = "Connection Successful!";
                    stringconnection.Text = "You are now connected with abonita_sales database";
                    stringconnection.ForeColor = System.Drawing.Color.Green;
                    statusLabel.ForeColor = System.Drawing.Color.Green; // Set text color to green for success
                }
                catch (Exception ex)
                {
                    statusLabel.Text = $"Connection Failed: {ex.Message}";
                    statusLabel.ForeColor = System.Drawing.Color.Red; // Set text color to red for failure
                }
            }

            panel1.Controls.Add(statusLabel); // Add the label to the panel
            panel1.Controls.Add(stringconnection);
        }
    }
}
