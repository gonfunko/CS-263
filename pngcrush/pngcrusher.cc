#include <cstdio>
#include <cstring>
#include <string>
#include "ppapi/cpp/instance.h"
#include "ppapi/cpp/module.h"
#include "ppapi/cpp/var.h"

extern "C" {
  #include "pngcrush.h"
}

const char* const kMainFuncId = "mainFunc";
  /*
  const char* const kReverseTextMethodId = "reverseText";
  const char* const kFortyTwoMethodId = "fortyTwo";
  static const char kMessageArgumentSeparator = ':';
  
  pp::Var MarshallFortyTwo() {
    return pp::Var(FortyTwo());
  }
  
  pp::Var MarshallReverseText(const std::string& text) {
    return pp::Var(ReverseText(text));
  }
  */
class PNGCrushInstance : public pp::Instance {
public:
  explicit PNGCrushInstance(PP_Instance instance) : pp::Instance(instance) {
    printf("PNGCrushInstance.\n");
  }
  virtual ~PNGCrushInstance() {}
  
  virtual void HandleMessage(const pp::Var& var_message);
};

void PNGCrushInstance::HandleMessage(const pp::Var& var_message) {
  if (!var_message.is_string()) {
    return;
  }
  std::string message = var_message.AsString();
  pp::Var return_var;
  /*
    if (message == kFortyTwoMethodId) {
    // Note that no arguments are passed in to FortyTwo.
    return_var = MarshallFortyTwo();
    } else if (message.find(kReverseTextMethodId) == 0) {
    // The argument to reverseText is everything after the first ':'.
    size_t sep_pos = message.find_first_of(kMessageArgumentSeparator);
    if (sep_pos != std::string::npos) {
    std::string string_arg = message.substr(sep_pos + 1);
    return_var = MarshallReverseText(string_arg);
    }
    }
  */
  
  if (message == kMainFuncId) {
    return_var = pp::Var("Crusher Crushed");
    char* arg1 = (char*)"./pngcrusher";
    char* arg2 = (char*)"/home/geoffrey/Pictures/costanzafloor.png";
    char* arg3 = (char*)"/home/geoffrey/Pictures/test.png";
    char* argv[] = {arg1, arg2, arg3};

    char* str;
    
    //    sprintf(str, "\n\nArgument List:\n\n");
    int geoff = 0;
    //    for (geoff = 0; geoff < 3; geoff++) {
    //      sprintf(str, "%s%s\n\n", str, argv[geoff]);
    //    }
    return_var = pp::Var(main_func(3, argv));
  }
  
  PostMessage(return_var);
}

class PNGCrushModule : public pp::Module {
public:
  PNGCrushModule() : pp::Module() {
    printf("Got here.\n");
  }
  virtual ~PNGCrushModule() {}
  
  virtual pp::Instance* CreateInstance(PP_Instance instance) {
    return new PNGCrushInstance(instance);
  }
};

namespace pp {
  Module* CreateModule() {
    return new PNGCrushModule();
  }
}  // namespace pp
