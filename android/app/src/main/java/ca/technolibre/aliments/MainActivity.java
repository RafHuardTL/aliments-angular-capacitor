package ca.technolibre.aliments;

import android.os.Bundle;
import android.view.View;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		bridge.getWebView().setOverScrollMode(View.OVER_SCROLL_NEVER);
	}
}
