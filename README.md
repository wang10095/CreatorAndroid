# CreatorAndroid
cocoscreator嵌入Android原生源码 下面是creator嵌入android的具体步骤。但是没有截图 我再上传一个work文档。

1、编译cocoscreator 
cd    工程/build/jsb-link   &&   cocos compile -p android -m debug 
编译完毕后会在    工程/build/jsb-link/frameworks/runtime-src/proj.android-studio/app/build/intermediates/ndkBuild
在ndkbuild目录下往后展开可以看到 armeabi-v7a  
这个目录下生成 so库文件。 （这里面只有libcocos2djs.so有用）

2、新建一个AndroidStdio空工程。
首先在  app 目录下的build.gradle 配置 ndk 检索目录   和sdk版本（最小为16 最大29 ） build版本设置为28.0.3

3、在app/src/main目录下 新建assets目录（字母不能拼错）把 creator项目中的 proj.android-studio/app/build/intermediates/merged_assets/debug/mergeDebugAssets/out 里面的文件拷贝到 assets目录里 
这个out目录就是 cocoscreator安卓编译时拷贝到这里的 资源文件。

4、在AndroidStdio的 app/src/main目录下 新建jniLibs（目录字母不能拼错）把creator里面proj.android-studio/build/intermediates/ndkbuild里面的armeabi-v7a目录拷贝到jniLibs里面 armeabi-v7a目录里面除了libcocos2djs.so,其他文件全部删除。 对应步骤2的ndk配置.

那么当前的androidstdio 目录如下图: armeabi最好也加上复制libcocos2djs.so到里面

5、添加libcocos2dx依赖模板点击File--New--Import Module。选择creator引擎目录中的cocos2d-x\cocos\platform\android\java



6、切换Android目录就会看到libcocos2dx依赖模板

7、关键的一步 设置依赖moudle    libcocos2dx. 右击工程名选择Open Module Settings 

选择Dependencies中的app点击加号选择Module Dependency.  就会看到一个libcocos2dx的模板，然后选择。 下图是选择完后的界面
就会出现libcocos2dx


8、再切换回 Project，在app/src/main/java/com.example.creatorandroid/  新建java文件来启动cocos2dx ,代码如下。 showAlertDialog没用可以不写。MyActivity 也没用

8、在app/src/main/AndroidManifest.xml里配置GameActivity以及cocos2djs的so文件和权限如下所示: (红色为添加的配置)
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.creatorandroid">

    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
    <uses-permission android:name="android.permission.READ_PHONE_STATE"/>
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_LOCATION_EXTRA_COMMANDS" />
    <uses-permission android:name="com.nabai.desgame.permission.JPUSH_MESSAGE" />
    <uses-permission android:name="android.permission.RECEIVE_USER_PRESENT" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_SETTINGS" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.RECORD_AUDIO"/>
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
    <uses-permission android:name="android.permission.GET_TASKS" />
    <uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <!-- Tell Cocos2dxActivity the name of our .so -->
        <meta-data android:name="android.app.lib_name" android:value="cocos2djs" />
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity android:name=".GameActivity"
            android:screenOrientation="landscape"
            android:configChanges="orientation|keyboardHidden|screenSize"
            android:label="@string/app_name"
            android:theme="@android:style/Theme.NoTitleBar.Fullscreen">
        </activity>
    </application>
</manifest>
9、这里很重要 在libcoocs2dx里面的 src/main/AndroidManifest.xml  必须注释掉  <uses-sdk android:minSdkVersion=“9”/> 不然会报错

10、libcocos2dx 的src/main/java/org.cocos2dx.lib 目录下的Cocos2dxActivity.java 第316行 注释掉 !isTaskRoot()如下图

11、Cocos2dxEditBox.java里会报错 因为找不到R.string.done, 

12、在src/main/res目录下新建string.xml 有就不用新建了。 然后把下面的配置 加上。

13、然后编译 打包 就完成了.



