# 奋斗日志 — 全栈实时版本 (Supabase)

## 为什么别人看不到？

之前是**纯静态网站**，数据存在浏览器 `localStorage` 里：
- 你的浏览器有数据 → 你能看到
- 别人的浏览器没有 → 别人看不到

**现在用 Supabase 做云端数据库**，所有人打开同一个链接，看到的内容完全一样！

---

## 部署步骤（免费，10分钟搞定）

### 第一步：注册 Supabase（1分钟）

1. 打开 https://supabase.com
2. 用 GitHub 账号登录（一键注册）
3. 点击 "New Project"
4. 填写项目名：`fendo-logs`
5. 选择区域：**Asia Pacific (Singapore)**（国内访问快）
6. 等 2 分钟初始化完成

### 第二步：建数据库表（2分钟）

进入项目后：
1. 左侧菜单 → **Table Editor**
2. 点击 **Create a new table**
3. 表名填：`logs`
4. 勾选 **Enable Row Level Security (RLS)**（不要关闭！）
5. 添加以下字段：

| 字段名 | 类型 | 默认值 |
|--------|------|--------|
| id | text | (留空，主键) |
| date | text | |
| day_of_week | text | |
| number | int8 | |
| quote | jsonb | `{}` |
| sections | jsonb | `[]` |
| slogan | text | `'全心奋进每一天'` |
| created_at | int8 | |

6. 点击 **Save**

### 第三步：创建存储桶（1分钟）

1. 左侧菜单 → **Storage**
2. 点击 **New bucket**
3. 名称填：`images`
4. 勾选 **Public bucket**（让图片可被公开访问）
5. 点击 **Create bucket**

### 第四步：拿到密钥（1分钟）

1. 左侧菜单 → **Project Settings** → **API**
2. 复制三个值：
   - `Project URL`（如 `https://xxxx.supabase.co`）
   - `anon public` 密钥
   - `service_role secret` 密钥（点击 Reveal）

### 第五步：填入环境变量（1分钟）

在项目根目录创建 `.env.local` 文件：

```
NEXT_PUBLIC_SUPABASE_URL=https://你的项目URL.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon密钥
SUPABASE_SERVICE_ROLE_KEY=你的service_role密钥
ADMIN_PASSWORD=你想设的管理员密码
```

### 第六步：安装依赖并运行（2分钟）

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:3000` 测试。

### 第七步：部署到 Vercel（2分钟）

1. 注册 https://vercel.com（用 GitHub 登录）
2. 点击 **Add New Project**
3. 导入你的 GitHub 仓库（或拖拽上传代码文件夹）
4. 在 **Environment Variables** 区域填入 `.env.local` 里的 4 个变量
5. 点击 **Deploy**
6. 等 2 分钟，拿到域名如 `https://fendo-logs.vercel.app`
7. **完成！所有人都能看到了！**

---

## 技术栈

| 服务 | 用途 | 费用 |
|------|------|------|
| **Supabase** | PostgreSQL 数据库 + 文件存储 | 免费（500MB 数据库 + 1GB 存储） |
| **Vercel** | 网站托管 + 服务器函数 | 免费（无限制访问） |
| | | **总共：完全免费** |

---

## 管理员使用

1. 打开网站
2. 点击右上角 **管理员登录**
3. 输入密码（默认 `fendo2026`，可在 `.env.local` 修改）
4. 登录后显示 **发布日志** 按钮
5. 发布内容 → 保存 → 所有人刷新页面都能看到
