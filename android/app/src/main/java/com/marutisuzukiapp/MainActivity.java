package com.marutisuzukiapp;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import android.os.Bundle;
import com.zoontek.rnbootsplash.RNBootSplash; // <- add this necessary import
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MarutiSuzukiApp";
  }
  // @Override
  // protected void onCreate(Bundle savedInstanceState) {
  // super.onCreate(null);
  // }

  // @Override
  // protected void onCreate(Bundle savedInstanceState) {
  //     super.onCreate(savedInstanceState);      
  //     RNBootSplash.init(MainActivity.this);
  // }   

    @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {

      @Override
      protected void loadApp(String appKey) {
        RNBootSplash.init(MainActivity.this); // <- initialize the splash screen
        super.loadApp(appKey);
      }
    };
  }


}
