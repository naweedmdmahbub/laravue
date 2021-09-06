/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout';

const brandRoutes = {
  path: '/brand',
  component: Layout,
  redirect: '/brand/list',
  name: 'Brand',
  meta: {
    title: 'Brand',
    icon: 'brand',
  },
  children: [
    // {
    //   path: 'create',
    //   component: () => import('@/views/brands/Create'),
    //   name: 'CreateBrand',
    //   meta: { title: 'Create Brand', icon: 'edit' },
    // },
    // {
    //   path: 'edit/:id(\\d+)',
    //   component: () => import('@/views/brands/Edit'),
    //   name: 'EditBrand',
    //   meta: { title: 'Edit Brand', noCache: true },
    //   hidden: true,
    // },
    {
      path: 'list',
      component: () => import('@/views/brands/List'),
      name: 'BrandList',
      meta: { title: 'Brand List', icon: 'list' },
    },
  ],
};

export default brandRoutes;
