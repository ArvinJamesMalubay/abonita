namespace Sales_Order
{
    partial class addNewProducts
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.supplierName = new System.Windows.Forms.ComboBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.txtsku = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.txtProductsName = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.description = new System.Windows.Forms.RichTextBox();
            this.label5 = new System.Windows.Forms.Label();
            this.category = new System.Windows.Forms.ComboBox();
            this.units = new System.Windows.Forms.ComboBox();
            this.label6 = new System.Windows.Forms.Label();
            this.unitPrice = new System.Windows.Forms.TextBox();
            this.label7 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.isAvailable = new System.Windows.Forms.CheckBox();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.uploadButton = new System.Windows.Forms.Button();
            this.btn_save = new System.Windows.Forms.Button();
            this.quantity = new System.Windows.Forms.TextBox();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // supplierName
            // 
            this.supplierName.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.supplierName.FormattingEnabled = true;
            this.supplierName.Location = new System.Drawing.Point(223, 35);
            this.supplierName.Name = "supplierName";
            this.supplierName.Size = new System.Drawing.Size(195, 28);
            this.supplierName.TabIndex = 0;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(219, 12);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(121, 20);
            this.label1.TabIndex = 1;
            this.label1.Text = "Suppliers Name";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.Location = new System.Drawing.Point(219, 118);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(46, 20);
            this.label2.TabIndex = 2;
            this.label2.Text = "SKU ";
            // 
            // txtsku
            // 
            this.txtsku.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txtsku.Location = new System.Drawing.Point(223, 141);
            this.txtsku.Name = "txtsku";
            this.txtsku.Size = new System.Drawing.Size(192, 26);
            this.txtsku.TabIndex = 3;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label3.Location = new System.Drawing.Point(219, 66);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(118, 20);
            this.label3.TabIndex = 4;
            this.label3.Text = "Products Name";
            // 
            // txtProductsName
            // 
            this.txtProductsName.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txtProductsName.Location = new System.Drawing.Point(223, 89);
            this.txtProductsName.Name = "txtProductsName";
            this.txtProductsName.Size = new System.Drawing.Size(195, 26);
            this.txtProductsName.TabIndex = 5;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label4.Location = new System.Drawing.Point(219, 170);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(166, 20);
            this.label4.TabIndex = 6;
            this.label4.Text = "Description (Optional) ";
            // 
            // description
            // 
            this.description.Location = new System.Drawing.Point(220, 193);
            this.description.Name = "description";
            this.description.Size = new System.Drawing.Size(427, 96);
            this.description.TabIndex = 7;
            this.description.Text = "";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label5.Location = new System.Drawing.Point(434, 12);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(73, 20);
            this.label5.TabIndex = 8;
            this.label5.Text = "Category";
            // 
            // category
            // 
            this.category.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.category.FormattingEnabled = true;
            this.category.Items.AddRange(new object[] {
            "Gadgets",
            "WIdgets",
            "Electronics",
            "Automotive",
            "Power Tools",
            "Hand Tools",
            "Hardware",
            "Software"});
            this.category.Location = new System.Drawing.Point(438, 35);
            this.category.Name = "category";
            this.category.Size = new System.Drawing.Size(195, 28);
            this.category.TabIndex = 9;
            // 
            // units
            // 
            this.units.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.units.FormattingEnabled = true;
            this.units.Items.AddRange(new object[] {
            "Piece (pc)",
            "Pack",
            "Box",
            "Set",
            "Bundle",
            "Gram (g)",
            "Kilogram (kg)",
            "Milligram (mg)",
            "Ton (t or metric ton)"});
            this.units.Location = new System.Drawing.Point(517, 89);
            this.units.Name = "units";
            this.units.Size = new System.Drawing.Size(116, 28);
            this.units.TabIndex = 13;
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label6.Location = new System.Drawing.Point(517, 66);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(38, 20);
            this.label6.TabIndex = 12;
            this.label6.Text = "Unit";
            // 
            // unitPrice
            // 
            this.unitPrice.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.unitPrice.Location = new System.Drawing.Point(438, 89);
            this.unitPrice.Name = "unitPrice";
            this.unitPrice.Size = new System.Drawing.Size(73, 26);
            this.unitPrice.TabIndex = 11;
            this.unitPrice.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.unitPrice_KeyPress);
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label7.Location = new System.Drawing.Point(434, 66);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(77, 20);
            this.label7.TabIndex = 10;
            this.label7.Text = "Unit Price";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label8.Location = new System.Drawing.Point(434, 118);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(58, 20);
            this.label8.TabIndex = 14;
            this.label8.Text = "Stocks";
            // 
            // isAvailable
            // 
            this.isAvailable.AutoSize = true;
            this.isAvailable.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.isAvailable.Location = new System.Drawing.Point(542, 147);
            this.isAvailable.Name = "isAvailable";
            this.isAvailable.Size = new System.Drawing.Size(91, 24);
            this.isAvailable.TabIndex = 17;
            this.isAvailable.Text = "Available";
            this.isAvailable.UseVisualStyleBackColor = true;
            // 
            // pictureBox1
            // 
            this.pictureBox1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.pictureBox1.Location = new System.Drawing.Point(42, 20);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(144, 118);
            this.pictureBox1.TabIndex = 18;
            this.pictureBox1.TabStop = false;
            // 
            // uploadButton
            // 
            this.uploadButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.uploadButton.Location = new System.Drawing.Point(42, 155);
            this.uploadButton.Name = "uploadButton";
            this.uploadButton.Size = new System.Drawing.Size(144, 33);
            this.uploadButton.TabIndex = 19;
            this.uploadButton.Text = "Upload an image";
            this.uploadButton.UseVisualStyleBackColor = true;
            // 
            // btn_save
            // 
            this.btn_save.FlatAppearance.BorderColor = System.Drawing.Color.Black;
            this.btn_save.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(192)))), ((int)(((byte)(255)))));
            this.btn_save.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(192)))), ((int)(((byte)(255)))));
            this.btn_save.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_save.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_save.Location = new System.Drawing.Point(505, 325);
            this.btn_save.Name = "btn_save";
            this.btn_save.Size = new System.Drawing.Size(142, 42);
            this.btn_save.TabIndex = 20;
            this.btn_save.Text = "Save";
            this.btn_save.UseVisualStyleBackColor = true;
            this.btn_save.Click += new System.EventHandler(this.btn_save_Click);
            // 
            // quantity
            // 
            this.quantity.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.quantity.Location = new System.Drawing.Point(438, 145);
            this.quantity.Name = "quantity";
            this.quantity.Size = new System.Drawing.Size(88, 26);
            this.quantity.TabIndex = 21;
            // 
            // addNewProducts
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.ClientSize = new System.Drawing.Size(696, 390);
            this.Controls.Add(this.quantity);
            this.Controls.Add(this.btn_save);
            this.Controls.Add(this.uploadButton);
            this.Controls.Add(this.pictureBox1);
            this.Controls.Add(this.isAvailable);
            this.Controls.Add(this.label8);
            this.Controls.Add(this.units);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.unitPrice);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.category);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.description);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.txtProductsName);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.txtsku);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.supplierName);
            this.MaximizeBox = false;
            this.Name = "addNewProducts";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Add  Products";
            this.Load += new System.EventHandler(this.addNewProducts_Load);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ComboBox supplierName;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox txtsku;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox txtProductsName;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.RichTextBox description;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.ComboBox category;
        private System.Windows.Forms.ComboBox units;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.TextBox unitPrice;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.CheckBox isAvailable;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.Button uploadButton;
        private System.Windows.Forms.Button btn_save;
        private System.Windows.Forms.TextBox quantity;
    }
}