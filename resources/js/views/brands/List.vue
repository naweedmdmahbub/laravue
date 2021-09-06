<!-- File: resources/js/views/brands/List.vue -->
<template>

<div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreateForm">
        {{ $t('table.add') }}
      </el-button>
    </div>

    <el-table :data="list" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Name" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Description">
        <template slot-scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="350">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEditForm(scope.row.id, scope.row.name);">
            Edit
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="handleDelete(scope.row.id, scope.row.name);">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>



    <el-dialog :title="'formTitle'" :visible.sync="brandFormVisible">
      <div class="form-container">
        <el-form ref="brandForm" :model="currentBrand" label-position="left" label-width="150px" style="max-width: 500px;">
          <el-form-item label="Name" prop="name">
            <el-input v-model="currentBrand.name" />
          </el-form-item>
          <el-form-item label="Description" prop="desc">
            <el-input v-model="currentBrand.desc" type="textarea" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="brandFormVisible = false">
            Cancel
          </el-button>
          <el-button type="primary" @click="handleSubmit()">
            Confirm
          </el-button>
        </div>
      </div>
    </el-dialog>
</div>
</template>

<script>
import Resource from '@/api/resource';
const brandResource = new Resource('brands');

export default {
  name: 'BrandList',
  data() {
    return {
      list: [],
      loading: true,
      brandFormVisible: false,
      currentBrand: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      const { data } = await brandResource.list({});
      this.list = data;
      console.log(this.list);
      this.loading = false;
    },
    handleSubmit() {
        if(this.currentBrand.id !==undefined){
            brandResource.update(this.currentBrand.id, this.currentBrand)
            .then(response =>{
                this.$message({
                    type: 'success',
                    message: 'Brand info has been updated successfully',
                    duration: 5 * 1000,
                });
                this.getList();
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.brandFormVisible = false;
            });

        } else {
            brandResource
                .store(this.currentBrand)
                .then(response => {
                    this.$message({
                        message: 'New brand ' + this.currentBrand.name + ' has been created successfully.',
                        type: 'success',
                        duration: 5 * 1000,
                    });
                    this.currentBrand = {
                        name: '',
                        desc: '',
                    };
                    this.brandFormVisible = false;
                    this.getList();
                })
                .catch(error => {
                    console.log(error);
                });

        }
    },
    handleCreateForm() {
      this.brandFormVisible = true;
      this.currentBrand = {
        name: '',
        desc: '',
      };
    },
    handleDelete(id, name) {
      this.$confirm('This will permanently delete brand ' + name + '. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        brandResource.destroy(id).then(response => {
          this.$message({
            type: 'success',
            message: 'Delete completed',
          });
          this.getList();
        }).catch(error => {
          console.log(error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled',
        });
      });
    },
    handleEditForm(id) {
      this.formTitle = 'Edit brand';
      this.currentBrand = this.list.find(brand => brand.id === id);
      this.brandFormVisible = true;
    },
  },
};
</script>