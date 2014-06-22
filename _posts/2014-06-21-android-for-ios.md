---
layout: post
title: "iOS开发者如何理解Android"
description: "iOS开发者如何理解Android"
category: programming
tags: [iOS, Android]
---
{% include JB/setup %}

### Java

* Java是没有命名前缀的，因为Java有命名空间和完整的包名路径来防止命名冲突
* Java必须要对null进行检查，对null调用方法是会抛异常的
* Java没有@property, 必须自己生产get和set方法
* Java的get方法一般以get为前缀，如getObject

### 工程结构

* 工程的第一部分是Java源码
* 工程的第二部分是res文件夹，包含图片和XML布局文件等资源
* iOS中图片通过@2x来适应屏幕分辨率，而Android通过存放不同的文件夹来处理各种不同分辨率下的图片、字符串
* XML布局文件就相当于iOS的xib,另外还有其他XML文件用于存放字符串、数字、样式等资源
* 工程的最后一部分是AndroidManifest.xml, 相当于iOS的Project-Info.plist, 用于存放activity、应用名、intent等信息

### Activity

* Activity 相当于 UIViewController
* iOS通过UINavigationController来安排UIViewController的进和出，而Android是通过一个全局的栈。当应用启动的时候，系统会将该应用的第一个Activity入栈，**而启动另外一个应用时，该应用的Activity也会入栈**, 所以用户可以通过按返回键来实现不同应用的跳转
* Activity通过Intent初始化另外一个Activity， 类似于iOS的UIViewController调用init。Activity完成后可以通过Intent来返回结果
* 只要正确地注册到AndroidManifest， 任何Activity都可以作为应用的入口

从一个Activity唤起另外一个Activity并等待返回:

	// A request code is a unique value for returning activities
	private static final int REQUEST_CODE_NEXT_ACTIVITY = 1234;

	protected void startNextActivity() {
    // Intents need a context, so give this current activity as the context
    	Intent nextActivityIntent = new Intent(this, NextActivity.class);
       	startActivityForResult(nextActivityResult, REQUEST_CODE_NEXT_ACTIVITY);
	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    	switch (requestCode) {
    	case REQUEST_CODE_NEXT_ACTIVITY:
        	if (resultCode == RESULT_OK) {
            	// This means our Activity returned successfully. For now, Toast this text.  
            	// This just creates a simple pop-up message on the screen.
                Toast.makeText(this, "Result OK!", Toast.LENGTH_SHORT).show();
            }
            return;
        }    
        super.onActivityResult(requestCode, resultCode, data);
	}	

在Activity完成之后返回结果:

	public static final String activityResultString = "activityResultString";

	/*
	 * On completion, place the object ID in the intent and finish with OK.
	 * @param returnObject that was processed
	 */
	private void onActivityResult(Object returnObject) {
	    Intent data = new Intent();
	    if (returnObject != null) {
            data.putExtra(activityResultString, returnObject.uniqueId);
        }
    
        setResult(RESULT_OK, data);
        finish();        
	}
	
### Fragment

* Fragment的概念只在Android上有，相当于用来填充Activity的小控件.比如在平板上，你可以放一个列表Fragment在左边，一个详情Fragment在右边
* Fragment是用于构造Android应用的新方式，类似于UICollectionView是代替UITableview来构造列表型数据的新方式

### ListView 和 Adapter

* ListView非常类似于iOS的UITableView
* UITableView有UITableViewController, ListView有ListActivity和ListFragment
* Android没有datasource和delegate，代替它们的是Adapter

一个Adapter的例子：


	public class PredictionArrayAdapter extends ArrayAdapter<Prediction> {

    	int LAYOUT_RESOURCE_ID = R.layout.view_three_item_list_view;

    	public PredictionArrayAdapter(Context context) {
        	super(context, R.layout.view_three_item_list_view);
    	}

    	public PredictionArrayAdapter(Context context, Prediction[] objects) {
        	super(context, R.layout.view_three_item_list_view, objects);
    	}

    	@Override
    	public View getView(int position, View convertView, ViewGroup parent)
    	{
        	Prediction prediction = this.getItem(position);
        	View inflatedView = convertView;
        	if(convertView==null)
        	{
            	LayoutInflater inflater = (LayoutInflater)getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            inflatedView = inflater.inflate(LAYOUT_RESOURCE_ID, parent, false);
        	}

        	TextView stopNameTextView = (TextView)inflatedView.findViewById(R.id.view_three_item_list_view_left_text_view);
        	TextView middleTextView = (TextView)inflatedView.findViewById(R.id.view_three_item_list_view_middle_text_view);
        	TextView stopSecondsTextView = (TextView)inflatedView.findViewById(R.id.view_three_item_list_view_right_text_view);

        	stopNameTextView.setText(prediction.stopName);
        	middleTextView.setText("");
        	stopSecondsTextView.setText(prediction.stopSeconds.toString());

        	return inflatedView;
    	}
	}

* getView相当于cellForRowAtIndexPath， 可以看到Android也复用了之前创建的view，以提高性能

### Activity 生命周期

![pic](/images/activity_lifecycle)

* Activity和UIViewController的生命周期类似，但Android对于Activity的销毁更无情, 所以需要用savedInstanceState或者Intent来保存Activity的状态，等onCreate()的时候再取出来
* 当屏幕旋转的时候，Activity是会被销毁然后重新创建的，需要保存状态

### 布局

* Android的布局是保存在res/layouts文件夹的XML文件里的，该XML比较易读
* Android总是用dp(density-independent pixels)而不是px

### 数据存储方式

* Shared Preferences，类似于NSUserDefaults
* 内存对象
* 文件存储
* SQLite，类似于Core Data

























