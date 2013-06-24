function OnLoad() {
    GetDYMOPrinters();
    GetPaperTray();
    GetMRUList();
    GetObjectNames();
    GetLabelImage();
    GetAPIVersion();
}

function UpdateControls() {
    GetLabelImage();
    GetDYMOPrinters();
    GetObjectNames();
}

function Open() {
    DYMOLabelPlugin.Open(OpenLabelPath.value);
    UpdateControls();
}

function OpenFromMRU() {
    DYMOLabelPlugin.OpenByMRUIndex(MRU.selectedIndex);
    UpdateControls();
}

function Save() {
    DYMOLabelPlugin.Save();
}

function SaveAs() {
    DYMOLabelPlugin.SaveAs(SaveLabelPath.value);
}

function Print() {
    DYMOLabelPlugin.Print(PrintCopies.value,PaperTray.value,ShowPrintDialog.checked);
}

function SetCurrentPrinter() {
    DYMOLabelPlugin.SetCurrentPrinter(PrinterName.value);
    GetLabelImage();
}

function GetCurrentPrinter() {
    PrinterName.value = DYMOLabelPlugin.GetCurrentPrinter();
}

function GetDYMOPrinters() {
    var printers = DYMOLabelPlugin.GetDymoPrinters();

    while(PrinterName.children.length)
	PrinterName.removeChild(PrinterName.children(0));

    if(printers)
    {
	printers = printers.split(";");
	
	for(var i=0;i < printers.length;i++)
	{
	    var newOption = document.createElement("option");
	    newOption.innerText = printers[i];
	    PrinterName.insertBefore(newOption);
	}
	GetCurrentPrinter();
    }
}

function GetLabelImage()
{
    DYMOLabelPlugin.GetLabelImage();
}

// Label

function GetPaperTray()
{
    PaperTray2.value = DYMOLabelPlugin.GetPaperTray();

    switch(PaperTray2.value)
    {
    case "select":
	PaperTray.value = "auto";
	break;
    case "undefined":
	PaperTray.value = "auto";
	break;
    default:
	PaperTray.value = DYMOLabelPlugin.GetPaperTray();
	break;
    }
}

function GetMRUList() {
    var mru = DYMOLabelPlugin.GetMRUList();

    while(MRU.children.length)
	MRU.removeChild(MRU.children(0));

    if(mru)
    {
	mru = mru.split(";");
	for(var i=0;i < mru.length;i++)
	{
	    var newOption = document.createElement("option");
	    newOption.innerText = mru[i];
	    MRU.insertBefore(newOption);
	}
    }
}
function GetObjectNames() {
    var names = DYMOLabelPlugin.GetObjectNames(VariableObjectsOnly.checked);

    while(ObjectName.children.length)
	ObjectName.removeChild(ObjectName.children(0));

    if(names)
    {
	names = names.split(";");

	for(var i=0;i < names.length;i++)
	{
	    var newOption = document.createElement("option");
	    newOption.innerText = names[i];
	    ObjectName.insertBefore(newOption);
	}
    }
}
function GetObjectData() {
    ObjectData.value = DYMOLabelPlugin.GetObjectData(ObjectName.value);
}

function SetObjectData() {
    DYMOLabelPlugin.SetObjectData(ObjectName.value,ObjectData.value);
    GetLabelImage();
}

function Paste() {
    DYMOLabelPlugin.Paste();
    GetLabelImage();
}

function PasteToObject() {
    DYMOLabelPlugin.PasteToObject(ObjectName.value);
    GetLabelImage();
}

function GetAPIVersion() {
    //APIVersion.innerText = 'API version: ' + DYMOLabelPlugin.GetAPIVersion();
}
