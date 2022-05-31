import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import viteCompression from 'vite-plugin-compression' // 解决构建压缩
import eslintPlugin from 'vite-plugin-eslint'
import path from 'path'

export default defineConfig((env) => {
    return {
        plugins: [
            createVuePlugin(/* options */),
            eslintPlugin({
                cache: false // 取消检查缓存
            }),
            viteCompression({
                // 生成压缩包gz
                verbose: true, // 输出压缩成功
                disable: false, // 是否禁用
                // filter // 默认为  /\.(js|mjs|json|css|html)$/i
                threshold: 1, // 体积大于阈值会被压缩，单位是b
                algorithm: 'gzip', // 压缩算法
                ext: '.gz'// 生成的压缩包后缀
            })
        ],
        build: {
            // assetsDir: './static',
            chunkSizeWarningLimit: 500,
            minify: 'terser',
            cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
            rollupOptions: {
                /** 打包输出文件名称路径配置 */
                output: {
                    chunkFileNames: 'js/[name]-[hash].js',
                    entryFileNames: 'js/[name]-[hash].js',
                    assetFileNames: '[ext]/[name]-[hash].[ext]'
                }
            },
            terserOptions: {
                compress: {
                    // warnings: false,
                    drop_console: true, // 打包时删除console
                    drop_debugger: true, // 打包时删除 debugger
                    pure_funcs: ['console.log']
                },
                output: {
                    // 去掉注释内容
                    comments: true
                }
            },
            brotliSize: false
        },
        resolve: {
            alias: {
                '@': path.join(__dirname, '/src'),
                '@img': path.join(__dirname, './src/assets/image')
            }
        },
        server: {
            open: false,
            host: 'localhost',
            port: 8081,
            https: false,
            proxy: {
                '/api': {
                    // target: 'http://admin.inkink.me',
                    target: 'http://beta.inkink.me:19090',
                    ws: true,
                    changOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        }
    }
})
