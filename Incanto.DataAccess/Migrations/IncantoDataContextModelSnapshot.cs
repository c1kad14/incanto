﻿// <auto-generated />
using Incanto.DataAccess.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace Incanto.DataAccess.Migrations
{
    [DbContext(typeof(IncantoDataContext))]
    partial class IncantoDataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Incanto.Domain.Brand", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CountryId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("CountryId");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasFilter("[Name] IS NOT NULL");

                    b.ToTable("Brands");
                });

            modelBuilder.Entity("Incanto.Domain.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<int?>("TypeId");

                    b.HasKey("Id");

                    b.HasIndex("TypeId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Incanto.Domain.Country", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasFilter("[Name] IS NOT NULL");

                    b.ToTable("Countries");
                });

            modelBuilder.Entity("Incanto.Domain.Detail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("DetailValueId");

                    b.Property<int?>("ItemId");

                    b.HasKey("Id");

                    b.HasIndex("DetailValueId");

                    b.HasIndex("ItemId");

                    b.ToTable("Details");
                });

            modelBuilder.Entity("Incanto.Domain.DetailType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CategoryId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("DetailTypes");
                });

            modelBuilder.Entity("Incanto.Domain.DetailTypeValue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("DetailTypeId");

                    b.Property<string>("Value");

                    b.HasKey("Id");

                    b.HasIndex("DetailTypeId");

                    b.ToTable("DetailTypeValues");
                });

            modelBuilder.Entity("Incanto.Domain.ExistingItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Amount");

                    b.Property<int?>("ItemId");

                    b.Property<int?>("SizeId");

                    b.HasKey("Id");

                    b.HasIndex("ItemId");

                    b.HasIndex("SizeId");

                    b.ToTable("ExistingItems");
                });

            modelBuilder.Entity("Incanto.Domain.Gender", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasFilter("[Name] IS NOT NULL");

                    b.ToTable("Genders");
                });

            modelBuilder.Entity("Incanto.Domain.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("BrandId");

                    b.Property<int?>("CategoryId");

                    b.Property<string>("Description");

                    b.Property<double>("Discount");

                    b.Property<string>("Identifier");

                    b.Property<string>("Name");

                    b.Property<double>("Price");

                    b.Property<bool>("Remote");

                    b.Property<string>("RemoteStore");

                    b.Property<DateTime>("Updated");

                    b.HasKey("Id");

                    b.HasIndex("BrandId");

                    b.HasIndex("CategoryId");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("Incanto.Domain.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ItemId");

                    b.Property<string>("Path");

                    b.Property<int>("Priority");

                    b.HasKey("Id");

                    b.HasIndex("ItemId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("Incanto.Domain.Size", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CategoryId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Sizes");
                });

            modelBuilder.Entity("Incanto.Domain.Transaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Amount");

                    b.Property<int?>("ExistingItemId");

                    b.Property<bool>("Finished");

                    b.Property<double>("Price");

                    b.Property<double>("Total");

                    b.Property<DateTime>("TransactionTime");

                    b.HasKey("Id");

                    b.HasIndex("ExistingItemId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("Incanto.Domain.Type", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("GenderId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("GenderId");

                    b.ToTable("Types");
                });

            modelBuilder.Entity("Incanto.Domain.Brand", b =>
                {
                    b.HasOne("Incanto.Domain.Country", "Country")
                        .WithMany()
                        .HasForeignKey("CountryId");
                });

            modelBuilder.Entity("Incanto.Domain.Category", b =>
                {
                    b.HasOne("Incanto.Domain.Type", "Type")
                        .WithMany()
                        .HasForeignKey("TypeId");
                });

            modelBuilder.Entity("Incanto.Domain.Detail", b =>
                {
                    b.HasOne("Incanto.Domain.DetailTypeValue", "DetailValue")
                        .WithMany()
                        .HasForeignKey("DetailValueId");

                    b.HasOne("Incanto.Domain.Item", "Item")
                        .WithMany("Details")
                        .HasForeignKey("ItemId");
                });

            modelBuilder.Entity("Incanto.Domain.DetailType", b =>
                {
                    b.HasOne("Incanto.Domain.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");
                });

            modelBuilder.Entity("Incanto.Domain.DetailTypeValue", b =>
                {
                    b.HasOne("Incanto.Domain.DetailType", "DetailType")
                        .WithMany()
                        .HasForeignKey("DetailTypeId");
                });

            modelBuilder.Entity("Incanto.Domain.ExistingItem", b =>
                {
                    b.HasOne("Incanto.Domain.Item", "Item")
                        .WithMany("ExistingItems")
                        .HasForeignKey("ItemId");

                    b.HasOne("Incanto.Domain.Size", "Size")
                        .WithMany()
                        .HasForeignKey("SizeId");
                });

            modelBuilder.Entity("Incanto.Domain.Item", b =>
                {
                    b.HasOne("Incanto.Domain.Brand", "Brand")
                        .WithMany()
                        .HasForeignKey("BrandId");

                    b.HasOne("Incanto.Domain.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");
                });

            modelBuilder.Entity("Incanto.Domain.Photo", b =>
                {
                    b.HasOne("Incanto.Domain.Item", "Item")
                        .WithMany("Photos")
                        .HasForeignKey("ItemId");
                });

            modelBuilder.Entity("Incanto.Domain.Size", b =>
                {
                    b.HasOne("Incanto.Domain.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");
                });

            modelBuilder.Entity("Incanto.Domain.Transaction", b =>
                {
                    b.HasOne("Incanto.Domain.ExistingItem", "ExistingItem")
                        .WithMany()
                        .HasForeignKey("ExistingItemId");
                });

            modelBuilder.Entity("Incanto.Domain.Type", b =>
                {
                    b.HasOne("Incanto.Domain.Gender", "Gender")
                        .WithMany()
                        .HasForeignKey("GenderId");
                });
#pragma warning restore 612, 618
        }
    }
}
